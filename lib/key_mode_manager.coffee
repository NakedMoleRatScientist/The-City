class KeyModeManager
  constructor: (@p5) ->
    @modes = initializeKeyModes(@p5)
  key_pressed: (n,logic) ->
    state = (logic.update_draw(n)).state
    if state == null
      @modes[n].key_pressed()
