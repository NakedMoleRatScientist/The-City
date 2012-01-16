class MinorModeManager
  constructor: (name,@parent) ->
    @modes = initializeMinorModes(name,@parent)
  act: (state) ->
    return if state == -1
    @modes[state].act()
  update: (state) ->
    @modes[state].update()
  input: (result,state) ->
    return if state == -1
    @modes[state].input(result)
  update_draw: (state) ->
    return -1 if state == -1
    return @modes[state].update_draw()
