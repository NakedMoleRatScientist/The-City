class GameMode
  constructor: ->
    @map = new Map(100,100)
    @map.generate()
    @units = new Units()
    @units.units.push new Unit(10,10, "Miya",1)
    @units.units.push new Unit(10,20, "John",1)
    @units.units[1].hostility = 1
    @units.units[0].target = @units.units[1]
    @message = new Message()
    @minor = new MinorModeManager("game")
  act: ->
    @units.move()
    @message.update(@units.units)
    @units.clean()
  input: (result) ->
    switch(result)
      when "up"
        @map.move_camera(0,-1)
      when "down"
        @map.move_camera(0,1)
      when "left"
        @map.move_camera(-1,0)
      when "right"
        @map.move_camera(1,0)
  update_draw: () ->
    return (units: @units, map: @map, msgs: @message.msg)