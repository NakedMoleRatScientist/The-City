class DrawMinorModeManager
  constructor: (name,mode,p5) ->
    @modes = initializeDrawMinorModes(name,p5)
  draw: (n,minor) ->
    @modes[n].draw(n,minor)
  input: (n,result) ->
    @modes[n].input(result)
