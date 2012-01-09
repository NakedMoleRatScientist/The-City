class MinorModeManager
  constructor: (name,mode) ->
    @modes = initializeMinorModes(name,mode)
    @state = -1
  act: () ->
    @modes[@state].act()
  input: (result) ->
    @modes[@state].input(result)
  update_draw: () ->
    return @modes[@state].update_draw()