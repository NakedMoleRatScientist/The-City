class KeyModeManager
  constructor: (@p5) ->
    @modes = initializeKeyModes(@p5)
  key_pressed: (logic) ->
    state = (logic.update_draw()).state
    if state == null
      return @modes[logic.n].key_pressed()
    @modes[logic.n].key_pressed(state)
  mouse_pressed: (logic) ->
    state = (logic.update_draw()).state
    if state == null
      return @modes[logic.n].mouse_pressed()
    @modes[logic.n].mouse_pressed(state)