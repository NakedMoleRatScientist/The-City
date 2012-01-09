class MinorModeManager
  constructor: (name,mode) ->
    @modes = initializeMinorModes(name,mode)
    @state = -1
  act: () ->
    return if @state == -1
    @modes[@state].act()
  input: (result) ->
    return if @state == -1
    @modes[@state].input(result)
  update_draw: () ->
    return if @state == -1
    return @modes[@state].update_draw()