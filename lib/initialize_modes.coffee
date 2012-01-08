initializeModes = () ->
  modes = modeList()
  for m in modes
    object = "new " + m + "Mode()"
    eval(object)