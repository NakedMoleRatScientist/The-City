class GameModeDraw
  constructor:(@p5) ->
    @unit_draw = new unitDraw(@p5,@units,@map)
    @map_draw = new mapDraw(@p5,100,100)
  draw: () ->
    @p5.background(0)
    @map_draw.draw()
    @unit_draw.draw()
  input: () ->