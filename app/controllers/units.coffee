class Units
  constructor: () ->
    @units = []
  move: () ->
    unit.move() for unit in @units
    unit.attack() for unit in @units
  clean: () ->
    cleanup = []
    cleanup.push(unit) if unit.body.check_death() for unit in @units
    @units = cleanup