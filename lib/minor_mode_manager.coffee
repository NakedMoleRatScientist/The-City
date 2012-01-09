class MinorModeManager
  constructor: (n,mode) ->
    @modes = minorModeList(n,mode)
  act: (state) ->
    @modes.act(state)