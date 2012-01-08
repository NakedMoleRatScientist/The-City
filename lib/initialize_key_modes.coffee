initializeKeyModes = () ->
  modes = modeList()
  for m in modes
    object = "new "+ m + "KeyMode()"
    eval(object)