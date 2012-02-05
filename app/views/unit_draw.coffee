class unitDraw
  constructor: (@p5) ->
  draw: (units,map) ->
    for unit in units.units
      @p5.fill()
      switch(unit.type)
      when 1
        @p5.fill(255,69,0)
        @p5.text("H",(unit.x + map.camera_x) * 20 + 5, (unit.y + map.camera_y) * 20 - 5)
      when 2
        @p5.fill(255,69,0)
        @p5.text("b",(unit.x + map.camera_x) * 20 + 5, (unit.y + map.camera_y) * 20 - 5)
