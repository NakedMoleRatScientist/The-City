class MenuKeyMode
  constructor: (@p5) ->
  key_pressed: (key) ->
    console.log(key.code)
    if key.code == 115
      return "down"
    else if key.code == 119
      return "up"
    else if key.code == 10
      return "game_mode"
    else
      return false
