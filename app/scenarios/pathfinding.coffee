pathfinding = () ->
  units.create new Human(10,10, "pathfinder_one",0)
  units.create new Human(10,20, "pathfinder_two",0)
  begin = (x: 15, y: 11)
  end = (x: 15, y: 9)
  map.sketch.draw(begin,end,"wall")
  units.units[0].set_move(20,10)
  units.units[0].agility = 25
  top_begin = (x: 13, y: 14)
  top_end = (x: 20, y: 14)
  map.sketch.draw(top_begin,top_end,"wall")
  bottom_begin = (x: 13, y: 25)
  bottom_end = (x: 20, y: 25)
  map.sketch.draw(bottom_begin,bottom_end,"wall")
  vertical_begin = (x: 20, y: 15)
  vertical_end = (x: 20, y: 24)
  map.sketch.draw(vertical_begin,vertical_end,"wall")
  units.units[1].set_move(25,20)
  units.units[1].agility = 25
