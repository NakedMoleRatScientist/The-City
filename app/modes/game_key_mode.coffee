class GameKeyMode extends KeyMode
  constructor: () ->
    super("game")
  key_pressed: (key,minor) ->
    switch(minor)
      when -1
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
      when 0
        super(key,minor)
