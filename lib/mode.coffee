class Mode
  constructor: ->
    @modes = list()
  act: (n) ->
    @modes[n].act()