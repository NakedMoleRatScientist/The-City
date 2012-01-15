class KeyMode
  constructor: (name) ->
    @minor_key = new KeyMinorModeManager(name)
