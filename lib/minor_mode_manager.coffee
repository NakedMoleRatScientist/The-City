class MinorModeManager
  constructor: (name,mode) ->
    @modes = initializeMinorModes(name,mode)
    @state = 0
  act: () ->
    @modes[@state].act()
  input: (result) ->
    @modes[@state].input(result)
  update_draw: () ->
    return @modes[@state].update_draw()