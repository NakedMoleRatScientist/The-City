class Units
  constructor: () ->
    @units = []
  move: () ->
    unit.move() for unit in @units
    unit.attack() for unit in @units
  clean: () ->
