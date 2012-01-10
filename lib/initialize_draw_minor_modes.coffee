initializeDrawMinorModes = (name,p5) ->
  #Should correspond with list modes
  modes = eval(name + "MinorModeList(p5)")
  for m in modes
    object = "new " + m + "DrawMode(p5)"
    eval(object)
