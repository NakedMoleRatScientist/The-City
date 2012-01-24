class MenuKeyMode extends KeyMode
  constructor: (@p5) ->
  key_pressed: () ->
    console.log(@p5.key.code)
    switch(@p5.key.code)
      when 115
        return "down"
      when 119
        return "up"
      when 10
        return "select"
      else
        return false
