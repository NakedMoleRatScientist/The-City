class Units
  constructor: () ->
    @units = []
  move: () ->
    unit.move() for unit in @units
    unit.attack() for unit in @units
  clean: () ->
    cleanup = []
    for unit in @units unless unit.check_death()
      cleanup.push(unit)
    @units = cleanup