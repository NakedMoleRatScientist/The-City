initializeMinorModes = (name,mode) ->
  modes = eval(name + "MinorModeList(mode)")
  for m in modes
    object = "new " + m + "MinorMode()"
    eval(object)