class GameDrawMode extends DrawMode
  constructor:(@p5) ->
    @unit_draw = new unitDraw(@p5)
    @map_draw = new mapDraw(@p5,100,100)
  draw: (object) ->
    map = object.map
    units = object.units
    msgs = object.msgs
    @p5.background(0)
    @map_draw.draw(map)
    @unit_draw.draw(units,map)
    messageDraw(@p5,msgs[msgs.length - 1])
  input: () ->
