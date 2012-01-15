class KeyMinorModeManager
  constructor: (name) ->
    @modes = initializeKeyMinorModes(name)
  key_pressed: (key,minor) ->
    @modes[minor].key_pressed(key)
