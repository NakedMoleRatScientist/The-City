class Mode
  constructor: ->
    @modes = list()
  act: (n) ->
    @modes[n].act()
  input: (n,result) ->
    @modes[n].input(result)
  update_draw: (n) ->
    return @modes[n].update_draw()