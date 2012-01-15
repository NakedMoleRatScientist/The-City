initializeKeyMinorModes = (name) ->
  modes = eval(name + "MinorModeList()")
  for m in modes
    object = "new " + m + "KeyMinorMode(mode)"
    eval(object)
