initializeMode = () ->
  modes = modeList()
  results = []
  for m in modes
    object = "new " + m + "Mode()"
    results.push (eval(object))