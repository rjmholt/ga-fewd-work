{application, robnet, [
	{description, "New project"},
	{vsn, "0.0.1"},
	{modules, ['robnet_app','robnet_sup','websock_chat_handler']},
	{registered, [robnet_sup]},
	{applications, [kernel,stdlib,cowboy]},
	{mod, {robnet_app, []}}
]}.