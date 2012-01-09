class Mode
  constructor:(n) ->
    @minor = new MinorModeManager(n)
    @status = 0
  act: () ->
    @minor.act(@status)