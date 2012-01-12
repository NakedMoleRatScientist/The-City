class Units
  constructor: (scenario) ->
    @units = []
    if scenario == "game"
      @units.units.push new Unit(10,10, "Miya",1)
      @units.units.push new Unit(10,20, "John",1)
      @units.units[1].hostility = 1
      @units.units[0].target = @units.units[1]

    @msg_manager = new MsgManager()
  move: () ->
    unit.move() for unit in @units
    unit.attack() for unit in @units
  clean: () ->
    @units = (unit for unit in @units when unit.body.check_death() == false)