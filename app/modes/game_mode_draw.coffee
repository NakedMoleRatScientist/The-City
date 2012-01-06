class GameModeDraw
  constructor:(@p5) ->
    @unit_draw = new unitDraw(@p5)
    @map_draw = new mapDraw(@p5,100,100)
  draw: (units, map) ->
    @p5.background(0)
    @map_draw.draw(map)
    @unit_draw.draw(units,map)
  input: () ->