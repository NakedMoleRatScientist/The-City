class ModeManager
  constructor: ->
    @modes = initializeModes()
  act: (n) ->
    @modes[n].act()
  input: (n,result) ->
    @modes[n].input(result)
  update_draw: (n) ->
    return @modes[n].update_draw()
  update_mode: (n) ->
    object = @modes[n].update_mode(n)
   #Need to clean up eventually
    if object == 0 || object == 1 || object == 2
      return object
    else
      this.game_mode(object.name)
      return object.mode
  game_mode: (name) ->
    @modes[0].units.initialize_scenario(name)
  mouse_input: (n) ->