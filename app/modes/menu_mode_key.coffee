class MenuModeKey
  constructor: () ->
  key_pressed: (key) ->
    console.log(key.code)
    if key.code == 115
      return "down"
    else if key.code == 119
      return "up"
    else
      return false
