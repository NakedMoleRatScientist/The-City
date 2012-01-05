class Mode
  constructor: ->
    @modes = list()
  act: (n) ->
    @modes[n].act()
  input: (@mode,result) ->
    @modes[n].input(result)