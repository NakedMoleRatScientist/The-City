class Mode
  constructor:(name) ->
    @state = -1
    @minor = new MinorModeManager(name)
  act: () ->
    @minor.act(@state)
  input: (result) ->
    @minor.input(result,@state)
  update_draw: () ->
    @minor.update_draw(@state)
