initializeMinorModes = (name) ->
  modes = eval(name + "MinorModeList()")
  for m in modes
    object = "new " + m + "MinorMode()"
    eval(object)