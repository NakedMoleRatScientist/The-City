class DrawMinorModeManager
  constructor: (name,mode,p5)
    @modes = initializeDrawMinorModes(name,p5)
  draw: (n)
    @modes[n].draw()
  input: (n,result) ->
    @modes[n].input(result)
