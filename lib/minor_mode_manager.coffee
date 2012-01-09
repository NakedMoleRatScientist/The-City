class MinorModeManager
  constructor: (name) ->
    @modes = initializeMinorModes(name)
  act: (state) ->
    @modes.act(state)