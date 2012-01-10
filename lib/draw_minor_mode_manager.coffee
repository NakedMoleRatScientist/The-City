class DrawMinorModeManager
  constructor: (name,mode,p5) ->
    @modes = initializeDrawMinorModes(name,p5)
  draw: (n,logic) ->
    @modes[n].draw(n,logic.update_draw(n))
  input: (n,result) ->
    @modes[n].input(result)
