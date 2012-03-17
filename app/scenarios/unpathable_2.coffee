unpathable2 = (units,map) ->
  map.width = 40
  map.height = 30
  map.size_map()
  units.create new Human(10,10, "pathfinder_one",0)
  begin = (x: 19, y: 9)
  end = (x: 21, y: 9 )
  map.sketch.draw(begin,end,"wall")
  begin.y = 11
  end.y = 11
  map.sketch.draw(begin,end,"wall")
  map.sketch.create("wall",19,10,false)
  map.sketch.create("wall",21,10,false)
  units.units[0].set_move(20,10)
  units.units[0].agility = 25
