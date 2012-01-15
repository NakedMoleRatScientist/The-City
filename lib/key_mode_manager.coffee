class KeyModeManager
  constructor: () ->
    @modes = initializeKeyModes()
  key_pressed: (n,key,logic) ->
    @modes[n].key_pressed(key)
