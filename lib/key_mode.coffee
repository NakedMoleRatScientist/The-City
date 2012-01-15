class KeyMode
  constructor: (name) ->
    @minor_key = new KeyMinorModeManager(name)
  key_pressed: (key,minor) ->
    @minor_key.key_pressed(key,minor)
