class KeyModeManager
  constructor: (@p5) ->
    @modes = initializeKeyModes(@p5)
  key_pressed: (logic) ->
    state = (logic.update_draw()).state
    if state == null
      return @modes[logic.n].key_pressed()
    @modes[n].key_pressed(state)
  mouse_pressed: (n,logic) ->
    state = (logic.update_draw(n)).state
    if state == null
      return @modes[n].mouse_pressed()
    @modes[n].mouse_pressed(state)