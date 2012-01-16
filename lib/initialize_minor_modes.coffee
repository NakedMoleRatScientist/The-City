initializeMinorModes = (name,host_mode) ->
  modes = eval(name + "MinorModeList()")
  for m in modes
    object = "new " + m + "MinorMode(host_mode)"
    eval(object)
