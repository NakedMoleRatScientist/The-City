class ModeDraw
  constructor: (@p5) ->
    @modes = listDraw(@p5)
  draw: (n, logic) ->
    @modes[n].draw(logic.update_draw())
  input: (n, result) ->
    @modes[n].input(result)