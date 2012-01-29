class Mode
  constructor:(name) ->
    @state = -1
    @minor = new MinorModeManager(name,this)
  act: () ->
    @minor.act()
  input: (result) ->
    @minor.input(result)
    return (change: false)
  update_draw: () ->
    @minor.update_draw()
  mouse_input: (result) ->