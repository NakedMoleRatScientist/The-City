initializeDrawModes = (p5) ->
  #Should correspond with list modes
  modes = modeList()
  for m in modes
    object = "new " + m + "DrawMode(p5)"
    eval(object)