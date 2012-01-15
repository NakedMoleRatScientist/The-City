class KeyMinorModeManager
  constructor: (name)
    @modes = initializeKeyMinorModes(name)
  key_pressed: (key) ->
