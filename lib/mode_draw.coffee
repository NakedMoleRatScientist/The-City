class ModeDraw
  constructor: (@p5,@logic) ->
    @modes = listDraw(@p5,@logic)
  draw: (n) ->
    @modes[n].draw()
  input: (n, result) ->
    @modes[n].input(result)