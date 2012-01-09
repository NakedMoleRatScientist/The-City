class MinorModeManager
  constructor: () ->
    @modes = []
  set_up: (n) ->
    @modes = minorModeList(n)