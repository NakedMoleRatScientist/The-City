class KeyMinorModeManager
  constructor: (name,@p5) ->
    @modes = initializeKeyMinorModes(name,@p5)
  key_pressed: (minor) ->
    @modes[minor].key_pressed()
