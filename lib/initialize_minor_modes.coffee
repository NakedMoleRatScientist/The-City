initializeMinorModes = (list) ->
  modes = list.call()
  for m in modes
    object = "new " + m + "MinorMode()"
    eval(object)