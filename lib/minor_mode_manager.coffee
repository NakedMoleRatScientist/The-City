class MinorModeManager
  constructor: (name,@parent) ->
    @modes = initializeMinorModes(name,@parent)
  act: () ->
    return if @parent.state == -1
    @modes[@parent.state].act()
  update: () ->
    @modes[@parent.state].update()
  input: (result) ->
    return if @parent.state == -1
    @modes[@parent.state].input(result)
  update_draw: () ->
    return -1 if @parent.state == -1
    return @modes[@parent.state].update_draw()
