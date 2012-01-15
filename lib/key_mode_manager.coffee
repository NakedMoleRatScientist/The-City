class KeyModeManager
  constructor: () ->
    @modes = initializeKeyModes()
  key_pressed: (n,key) ->
    @modes[n].key_pressed(key)
