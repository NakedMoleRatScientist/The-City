class MinorModeManager
  constructor: (n) ->
    @modes = minorModeList(n)
  act: (state) ->
    @modes.act(state)