{application, robnet, [
	{description, "New project"},
	{vsn, "0.0.1"},
	{modules, ['robnet_app','robnet_sup']},
	{registered, [robnet_sup]},
	{applications, [kernel,stdlib,cowboy]},
	{mod, {robnet_app, []}}
]}.