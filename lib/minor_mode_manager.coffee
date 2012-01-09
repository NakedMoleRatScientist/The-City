class MinorModeManager
  constructor: (name) ->
    @modes = initializeMinorModes(name)
    @state = 0
  act: () ->
    @modes.act(@state)
  input: (result) ->
    @modes.input(@state)
  update_draw: () ->
    return @modes.update_draw(@state)