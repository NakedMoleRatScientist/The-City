unitDraw = (p5,units,map) ->
  for unit in units
    x = (unit.x - map.camera_x) * 20 + 5
    y = (unit.y - map.camera_y) * 20 + 20 #Need an extra 20 to get it to show in the correct location
    pink = p5.color(255,193,203)
    blue = p5.color(0,0,255)
    if unit.gender == 0
      p5.fill(blue)
    else
      p5.fill(pink)
    switch(unit.type)
      when 1
        p5.text("H",x,y)
      when 2
        p5.text("B",x,y)
