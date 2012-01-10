initializeDrawMinorModes = (name,p5) ->
  #Should correspond with list modes
  modes = eval(name + "MinorModeList()")
  for m in modes
    object = "new " + m + "DrawMinorMode(p5)"
    eval(object)
