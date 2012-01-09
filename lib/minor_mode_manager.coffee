class MinorModeManager
  constructor: (n,mode) ->
    @modes = gameMinorModeList()
  act: (state) ->
    @modes.act(state)