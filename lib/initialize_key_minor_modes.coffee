initializeKeyMinorModes = (name,p5) ->
  modes = eval(name + "MinorModeList()")
  for m in modes
    object = "new " + m + "KeyMinorMode(p5)"
    eval(object)
