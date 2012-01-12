class DrawMinorModeManager
  constructor: (name,mode,p5) ->
    @modes = initializeDrawMinorModes(name,p5)
  draw: (n,object) ->
    @modes[n].draw(object)
  input: (n,result) ->
    @modes[n].input(result)
