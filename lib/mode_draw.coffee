class ModeDraw
  constructor: (@p5) ->
    @modes = listDraw(@p5)
  draw: (n) ->
    @modes[n].draw()
  input: (n, result) ->
    @modes[n].input(result)