class KeyModeManager
  constructor: (@p5) ->
    @modes = initializeKeyModes(@p5)
  key_pressed: (n,key,logic) ->
    minor = (logic.update_draw(n)).minor
    @modes[n].key_pressed(minor)
