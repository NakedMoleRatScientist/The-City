initializeKeyMinorModes = (name) ->
  modes = eval(name + "KeyMinorModeList()")
  for m in modes
    object = "new " + m + "KeyMinorMode(mode)"
    eval(object)
