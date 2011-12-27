class unitDraw
  constructor: () ->
  draw: (p5,unit,map) ->
    p5.fill()
    if unit.type == 1
      p5.fill(255,69,0)
      p5.text("H",(unit.x + map.camera_x) * 20 + 5, (unit.y + map.camera_y) * 20 - 5)
