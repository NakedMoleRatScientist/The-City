unpathable1 = (units,map) ->
  units.create new Human(10,10, "pathfinder_one",0)
  map.sketch.create_wall(20,10)
  units.units[0].set_move(20,10)
  units.units[0].agility = 25