class unitDraw
  constructor: () ->
  draw: (p5,unit) ->
    p5.fill()
    if unit.type == 1
      p5.fill(255,69,0)
      p5.text("H",unit.x * 20 + 5, unit.y * 20 - 5)
