class DrawMode
  constructor:(name) ->
    @minor_draw = new DrawMinorModeManager(name,p5)
