class GameKeyMode
  constructor: () ->
  key_pressed: (key) ->
    if key.code == 97
      return "right"
    else if key.code == 100
      return "left"
    else if key.code == 114
      return "report"
    else if key.code == 115
      return "up"
    else if key.code == 119
      return "down"
