{application, robnet, [
	{description, "New project"},
	{vsn, "0.0.1"},
	{modules, ['robnet_app','robnet_sup','webchat_server','websock_chat_handler']},
	{registered, [robnet_sup]},
	{applications, [kernel,stdlib,cowboy,jiffy]},
	{mod, {robnet_app, []}}
]}.