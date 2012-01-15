class GameKeyMode extends KeyMode
  constructor: () ->
  key_pressed: (key) ->
    console.log(key.code)
    switch(key.code)
      when 97
        return "right"
      when 100
        return "left"
      when 114
        return "report"
      when 115
        return "up"
      when 119
        return "down"
