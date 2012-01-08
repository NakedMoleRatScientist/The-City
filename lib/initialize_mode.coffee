initializeMode = () ->
  modes = modeList()
  results = []
  for i in modes
    results.push (eval "new " + modes[i] + "Mode()")