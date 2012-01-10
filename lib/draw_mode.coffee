class DrawMode
  constructor:(name) ->
    @minor_draw = new DrawMinorModeManager(name,p5)
  draw: (object) ->
    @minor_draw.draw(object.state,object)
