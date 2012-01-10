class Mode
  constructor:(name) ->
    @state = -1
    @minor = new MinorModeManager(name)
    @minor_draw = new DrawMinorModeManager(name,p5)
  act: () ->
    @minor.act(@state)
    @minor_draw.draw(@state,@minor)
  input: (result) ->
    @minor.input(result,@state)
  update_draw: () ->
    @minor.update_draw(@state)
