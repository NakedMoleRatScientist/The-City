class GameMode extends Mode
  constructor: ->
    @map = new Map(100,100)
    @map.generate()
    @units = new Units("game")
    super("game")
  act: ->
    @units.move()
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
      when "back"
        @state = -1
  update_draw: () ->
    return (units: @units, map: @map, msg: @units.msg_manager.get_last_update()) if @state == -1
    super()
