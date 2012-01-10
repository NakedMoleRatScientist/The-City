class Mode
  constructor:(name,p5) ->
    @minor = new MinorModeManager(name)
  act: () ->
    @minor.act()
  input: (result) ->
    @minor.input(result)
  update_draw: () ->
    @minor.update_draw()
