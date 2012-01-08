class KeyMode
  constructor: () ->
    @modes = initializeKeyModes()
  key_pressed: (n,key) ->
    @modes[n].key_pressed(key)