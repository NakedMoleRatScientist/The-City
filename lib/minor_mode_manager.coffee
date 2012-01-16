class MinorModeManager
  constructor: (name,@parent) ->
    @modes = initializeMinorModes(name,@parent)
    @state = @parent.state
  act: () ->
    return if @state == -1
    @modes[@state].act()
  update: () ->
    @modes[@state].update()
  input: (result) ->
    return if @state == -1
    @modes[@state].input(result)
  update_draw: () ->
    return -1 if @state == -1
    return @modes[@state].update_draw()
