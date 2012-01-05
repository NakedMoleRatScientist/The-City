class MenuModeKey
  constructor: (@talk) ->
  key_pressed: (key) ->
    console.log(key.code)
    if key.code == 115
      return true
    else
      return false
