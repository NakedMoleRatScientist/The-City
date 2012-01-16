class MenuKeyMode
  constructor: (@p5) ->
  key_pressed: () ->
    console.log(@p5.key.code)
    if @p5.key.code == 115
      return "down"
    else if @p5.key.code == 119
      return "up"
    else if @p5.key.code == 10
      return "game_mode"
    else
      return false
