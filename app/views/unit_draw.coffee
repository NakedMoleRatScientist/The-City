unitDraw = (p5,units,map) ->
  for unit in units
    x = (unit.x - map.camera_x) * 20 + 5
    y = (unit.y - map.camera_y) * 20 + 20 #Need an extra 20 to get it to show in the correct location
    switch(unit.type)
      when 1
        p5.fill(255,69,0)
        p5.text("H",x,y)
      when 2
        p5.fill(255,69,0)
        p5.text("B",x,y)
