class ModeManager
  constructor: ->
    @modes = initializeModes()
    @n = 1
  act: () ->
    @modes[@n].act()
  input: (result) ->
    @modes[@n].input(result)
  update_draw: () ->
    return @modes[@n].update_draw()
  game_mode: (@name) ->
    @modes[0].units.initialize_scenario(@name)
  mouse_input:(result) ->
    @modes[@n].mouse_input(result)
  switch_mode: (n) ->
    if n == 0 && @n == 1
      this.game_mode("game")
    @n = n
