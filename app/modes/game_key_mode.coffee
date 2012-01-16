class GameKeyMode extends KeyMode
  constructor: (@p5) ->
    super("game")
  key_pressed: (minor) ->
    switch(minor)
      when -1
        console.log(@p5.key.code)
        switch(@p5.key.code)
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
      when 0
        super(minor)
