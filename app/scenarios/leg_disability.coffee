legDisability = (units,map) ->
  @units.create new Human(10,10, "Can'tWalk",0)
  @units.units[0].body.leg = 2
  @units.units[0].set_move(20,20)
