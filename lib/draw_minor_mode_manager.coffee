class DrawMinorModeManager
  constructor: (name,p5) ->
    @modes = initializeDrawMinorModes(name,p5)
  draw: (n,object) ->
    @modes[n].draw(object)
  input: (n,result) ->
    @modes[n].input(result)
