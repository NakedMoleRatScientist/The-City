class ModeKey
  constructor: () ->
    @modes = listKey()
  detect: (n) ->
    @modes[n].detect()