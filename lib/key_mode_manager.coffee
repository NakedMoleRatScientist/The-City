class KeyModeManager
  constructor: () ->
    @modes = initializeKeyModes()
  key_pressed: (n,key,logic) ->
    minor = (logic.update_draw(n)).minor
    @modes[n].key_pressed(key,minor)
