class Units
  constructor: () ->
    @units = []
  move: () ->
    unit.move() for unit in @units