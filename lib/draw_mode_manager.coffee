class DrawModeManager
  constructor: (@p5) ->
    @modes = initializeDrawModes(@p5)
  draw: (logic) ->
    @modes[logic.n].draw(logic.update_draw())
    frameRateDraw(@p5)
  input: (logic, result) ->
    @modes[logic.n].input(result)
