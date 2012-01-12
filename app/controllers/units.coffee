class Units
  constructor: () ->
    @units = []
    @msg = new MsgManager()
  move: () ->
    unit.move() for unit in @units
    unit.attack() for unit in @units
  clean: () ->
    @units = (unit for unit in @units when unit.body.check_death() == false)