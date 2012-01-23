class GameKeyMode extends KeyMode
  constructor: (@p5) ->
    super("game",@p5)
  key_pressed: (state) ->
    switch(state)
      when -1
        console.log(@p5.key.code)
        switch(@p5.key.code)
          when 97
            return "right"
          when 98
            return "build"
          when 99
            return "crystal"
          when 100
            return "left"
          when 114
            return "report"
          when 115
            return "up"
          when 119
            return "down"
          when 109
            return "menu"
          else
            return false
      when 0
        super(state)
    return false
  mouse_pressed: (state) ->
    switch(state)
      when -1
        console.log("BEEP")