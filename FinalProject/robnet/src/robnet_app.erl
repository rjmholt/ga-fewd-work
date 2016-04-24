-module(robnet_app).
-behaviour(application).

-export([start/2]).
-export([stop/1]).

start(_Type, _Args) ->
    webchat_server:start_link(),
    Paths =
    [
     {"/", cowboy_static, {priv_file, robnet, "assets/index.html"}},
     {"/pages/[...]", cowboy_static, {priv_dir, robnet, "assets"}},
     {"/websocket", websock_chat_handler, []}
    ],
    Dispatch = cowboy_router:compile([
        {'_', Paths}
    ]),
    cowboy:start_http(my_http_listener, 100, [{port, 8080}],
                      [{env, [{dispatch, Dispatch}]}]
                     ),
    robnet_sup:start_link().

stop(_State) ->
    ok.
