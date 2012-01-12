class GameMode extends Mode
  constructor: ->
    @map = new Map(100,100)
    @map.generate()
    @units = new Units("game")
    @messages = new Messages()
    super("game")
  act: ->
    @units.move()
    @messages.update(@units.units)
    @units.clean()
  input: (result) ->
    super(result)
    switch(result)
      when "up"
        @map.move_camera(0,-1)
      when "down"
        @map.move_camera(0,1)
      when "left"
        @map.move_camera(-1,0)
      when "right"
        @map.move_camera(1,0)
      when "report"
        @state = 0
  update_draw: () ->
    return (units: @units, map: @map, msgs: @messages.msg, minor: @minor.update_draw(@state))
