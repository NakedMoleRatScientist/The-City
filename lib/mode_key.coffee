class ModeKey
  constructor: (@p5) ->
    @modes = listKey()
  detect: (n) ->
    @modes[n].detect()