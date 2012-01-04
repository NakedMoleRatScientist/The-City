class GameModeDraw
  constructor: ->
    @unit_draw = new unitDraw(p5,@units,@map)
    @map_draw = new mapDraw(100,100)