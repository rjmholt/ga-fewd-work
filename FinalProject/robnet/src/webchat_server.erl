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

-record(state, {clients=[]}).

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
    erlang:display("Handling chat message"),
    gen_server:cast(?SERVER, {message, Ident, Txt}).

%% gen_server.

init([]) ->
	{ok, #state{}}.

handle_call(_Request, _From, State) ->
	{reply, ignored, State}.

handle_cast({join, Pid}, State) ->
    Clients = [Pid|State#state.clients],
    erlang:display(State#state.clients),
    {noreply, State#state{clients=Clients}};

handle_cast({quit, Pid}, State) ->
    erlang:display(State#state.clients),
    Clients = lists:delete(Pid, State#state.clients),
    {noreply, State#state{clients=Clients}};

handle_cast({message, Ident, Txt}, State) ->
    erlang:display(State#state.clients),
    Msg = #{type => message, identity => Ident, message => Txt},
    lists:foreach(fun (Pid) -> Pid ! Msg end, State#state.clients),
    {noreply, State};

handle_cast(_Msg, State) ->
	{noreply, State}.

handle_info(_Info, State) ->
	{noreply, State}.

terminate(_Reason, _State) ->
	ok.

code_change(_OldVsn, State, _Extra) ->
	{ok, State}.
