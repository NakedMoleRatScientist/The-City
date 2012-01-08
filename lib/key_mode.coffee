class ModeKey
  constructor: (@talk) ->
    @modes = listKey(@talk)
  key_pressed: (n,key) ->
    @modes[n].key_pressed(key)