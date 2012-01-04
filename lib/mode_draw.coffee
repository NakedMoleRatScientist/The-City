class ModeDraw
  constructor: (@p5) ->
    @modes = listDraw()
  draw: (n) ->
    @modes[n].draw()