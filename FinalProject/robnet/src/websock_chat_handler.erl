-module(websock_chat_handler).
-behaviour(cowboy_websocket_handler).

-export([init/3]).
-export([websocket_init/3]).
-export([websocket_handle/3]).
-export([websocket_info/3]).
-export([websocket_terminate/3]).

-record(state, {guests=[]}).

init(_, _, _) ->
    {upgrade, protocol, cowboy_websocket}.

websocket_init(_, Req, _Opts) ->
    webchat_server:join(self()),
    Req2 = cowboy_req:compact(Req),
    {ok, Req2, #state{}}.

websocket_handle({text, Data}, Req, State) ->
    Msg = jiffy:decode(Data, [return_maps]),
    erlang:display(Msg),
    webchat_server:handle_msg(Msg),
    {ok, Req, State};

websocket_handle({binary, Data}, Req, State) ->
    {reply, {binary, Data}, Req, State};

websocket_handle(_Frame, Req, State) ->
    {ok, Req, State}.

websocket_info(Msg, Req, State) ->
    Data = jiffy:encode(Msg),
    {reply, {text, Data}, Req, State, hibernate}.

websocket_terminate(_Reason, _Req, _State) ->
    webchat_server:quit(self()),
    ok.
