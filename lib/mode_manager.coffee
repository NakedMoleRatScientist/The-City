class ModeManager
  constructor: ->
    @modes = initializeModes()
    @n = 1
  act: () ->
    @modes[@n].act()
  input: (result) ->
    object = @modes[@n].input(result)
    if object.change != false
      this.switch_mode(object.change)
  update_draw: () ->
    return @modes[@n].update_draw()
  game_mode: (@name) ->
    @modes[0].units.initialize_scenario(@name)
  mouse_input:(result) ->
    @modes[@n].mouse_input(result)
  switch_mode: (object) ->
    n = object.change
    if n == 0 && @n == 1
      this.game_mode("game")
    else if n == 0 && @n == 2
      this.game_mode(object.name)
    @n = n
