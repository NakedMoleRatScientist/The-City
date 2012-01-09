class Mode
  constructor:(n) ->
    @minor = new MinorModeManager(n)
  act: () ->
    @minor.act()