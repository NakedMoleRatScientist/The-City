class DrawMinorModeManager
  constructor: (name,p5) ->
    @modes = initializeDrawMinorModes(name,p5)
  draw: (n) ->
    @modes[n].draw(n)
  input: (n,result) ->
    @modes[n].input(result)
