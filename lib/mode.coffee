class Mode
  constructor: ->
    @modes = list()
  act: (n) ->
    @modes[n].act()
  input: (n,result) ->
    @modes[n].input(result)