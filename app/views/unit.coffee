class unitDraw
  constructor: () ->
  draw: (p5,unit) ->
    p5.text(unit.name,unit.x * 20, unit.y * 20)
