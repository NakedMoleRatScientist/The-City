class MinorModeManager
  constructor: (name,mode) ->
    @modes = initializeMinorModes(name)
  act: (state) ->
    return if state == -1
    @modes[state].act()
  input: (result,state) ->
    return if state == -1
    @modes[state].input(result)
  update_draw: (state) ->
    return -1 if state == -1
    return @modes[state].update_draw()
