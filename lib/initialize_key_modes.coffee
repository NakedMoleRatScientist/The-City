initializeKeyModes = (p5) ->
  modes = modeList()
  for m in modes
    object = "new "+ m + "KeyMode(p5)"
    eval(object)
