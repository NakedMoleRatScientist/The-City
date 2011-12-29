class unitDraw
  constructor: (@p5,@units,@map) ->
  draw: (p5,units,map) ->
    draw_unit unit for unit in @units
  draw_unit: (unit) ->
    @p5.fill()
    if unit.type == 1
      @p5.fill(255,69,0)
      @p5.text("H",(unit.x + @map.camera_x) * 20 + 5, (unit.y + @map.camera_y) * 20 - 5)
