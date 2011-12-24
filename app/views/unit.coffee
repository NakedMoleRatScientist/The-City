class unitDraw
  constructor: () ->
  draw: (p5,unit) ->
    p5.fill()
    if unit.type == 1
      p5.text("H",unit.x * 20, unit.y * 20)
