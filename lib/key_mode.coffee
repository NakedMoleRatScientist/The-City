class KeyMode
  constructor: (name,@p5) ->
    @minor_key = new KeyMinorModeManager(name,@p5)
  key_pressed: (state) ->
    @minor_key.key_pressed(state)
  mouse_pressed: (state) ->
