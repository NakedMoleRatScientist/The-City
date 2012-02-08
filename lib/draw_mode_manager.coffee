class DrawModeManager
  constructor: (@p5) ->
    @modes = initializeDrawModes(@p5)
  draw: (logic) ->
    frameRateDraw(@p5)
    @modes[logic.n].draw(logic.update_draw())
  input: (logic, result) ->
    @modes[logic.n].input(result)
