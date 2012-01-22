class Mode
  constructor:(name) ->
    @state = -1
    @minor = new MinorModeManager(name,this)
  act: () ->
    @minor.act()
  input: (result) ->
    @minor.input(result)
  update_draw: () ->
    @minor.update_draw()
  mouse_input: () ->
  update_mode:(n) ->
    return n