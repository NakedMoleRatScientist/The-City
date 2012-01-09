class Mode
  constructor:(n) ->
    @minor = new MinorModeManager(n)
  act: () ->
    @minor.act()
  input: () ->
    @minor.input(result)
  update_draw: () ->
    @minor.update_draw()