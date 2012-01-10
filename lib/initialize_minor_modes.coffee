initializeMinorModes = (name,mode) ->
  modes = eval(name + "MinorModeList()")
  for m in modes
    object = "new " + m + "MinorMode(mode)"
    eval(object)
