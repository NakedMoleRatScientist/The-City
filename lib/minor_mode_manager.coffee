class MinorModeManager
  constructor: (name) ->
    @modes = initializeMinorModes(name)
    @state = 0
  act: () ->
    @modes.act(@state)