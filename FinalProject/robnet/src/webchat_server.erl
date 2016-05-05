-module(webchat_server).
-behaviour(gen_server).

-define(SERVER, robchat).

%% API.
-export([start_link/0,
         join/1,
         quit/1,
         handle_msg/1]).

%% gen_server.
-export([init/1]).
-export([handle_call/3]).
-export([handle_cast/2]).
-export([handle_info/2]).
-export([terminate/2]).
-export([code_change/3]).

-record(state, {clients=[], names=#{}}).

%% API.

-spec start_link() -> {ok, pid()}.
start_link() ->
	gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

join(Pid) ->
    gen_server:cast(?SERVER, {join, Pid}).

quit(Pid) ->
    gen_server:cast(?SERVER, {quit, Pid}).

handle_msg(#{<<"type">> := <<"message">>,
             <<"identity">> := Ident,
             <<"message">> := Txt}) ->
    gen_server:cast(?SERVER, {message, Ident, Txt});

handle_msg(#{<<"type">> := <<"changeid">>,
             <<"newid">> := NewIdent,
             <<"oldid">> := OldIdent}) ->
    gen_server:cast(?SERVER, {changeid, NewIdent, OldIdent, self()}).

%% gen_server.

init([]) ->
	{ok, #state{}}.

handle_call(_Request, _From, State) ->
	{reply, ignored, State}.

handle_cast({join, Pid}, State) ->
    Clients = [Pid|State#state.clients],
    {noreply, State#state{clients=Clients}};

handle_cast({quit, Pid}, State) ->
    Clients = lists:delete(Pid, State#state.clients),
    Names = maps:remove(Pid, State#state.names),
    Msg = #{type => peerlist, peers => maps:values(Names)},
    send_all(State#state.clients, Msg),
    {noreply, State#state{clients=Clients, names=Names}};

handle_cast({message, Ident, Txt}, State) ->
    Msg = #{type => message, identity => Ident, message => Txt},
    send_all(State#state.clients, Msg),
    {noreply, State};

handle_cast({changeid, NewIdent, OldIdent, Pid}, State) ->
    Names = State#state.names,
    NewNames = case maps:is_key(Pid, Names) of
                   true ->
                       maps:update(Pid, NewIdent, Names);
                   _ ->
                       maps:put(Pid, NewIdent, Names)
               end,
    NewState = State#state{names=NewNames},
    NewIDMsg = #{type => newid, identity => NewIdent, former => OldIdent},
    send_all(State#state.clients, NewIDMsg),
    PeersMsg = #{type => peerlist, peers => maps:values(NewNames)},
    send_all(State#state.clients, PeersMsg),
    {noreply, NewState};

handle_cast(_Msg, State) ->
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, _State) ->
	ok.

code_change(_OldVsn, State, _Extra) ->
	{ok, State}.

send_all(ClientList, Msg) ->
    erlang:display(Msg),
    lists:foreach(fun (Pid) -> Pid ! Msg end, ClientList).
