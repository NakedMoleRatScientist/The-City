class ModeKey
  constructor: () ->
    @modes = listKey()
  key_pressed: (n,key) ->
    @modes[n].key_pressed(key)