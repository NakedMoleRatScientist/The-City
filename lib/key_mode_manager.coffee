class KeyModeManager
  constructor: (@p5) ->
    @modes = initializeKeyModes(@p5)
  key_pressed: (n,logic) ->
    state = (logic.update_draw(n)).state
    if state == null
      return @modes[n].key_pressed()
    @modes[n].key_pressed(state)
  mouse_input: (n,logic)
    state = (logic.update_draw(n)).state
    if state == null
      return @modes[n].mouse_input()
    @modes[n].mouse_input(state)