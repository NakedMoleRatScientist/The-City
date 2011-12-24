class unitDraw
  constructor: () ->
  draw: (p5,unit) ->
    p5.fill()
    if unit.type == 1
      p5.textAlign(p5.CENTER)
      p5.fill(255,69,0)
      p5.text("H",unit.x * 20, unit.y * 20)
