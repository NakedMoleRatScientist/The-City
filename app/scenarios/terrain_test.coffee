terrainTest = (units,map) ->
  map.generate.create_building(10,10,3)
  map.sketch.create("crystal",11,11)
  #This building won't be generated
  map.generate.create_building(9,9,1)
  #This building is below the first generated building
  map.generate.create_building(13,14,3)
  #creating crystal pile on wall shouldn't be possible
  map.sketch.create("crystal",10,10)
  #on top of a forbidden position, a building can't be generated
  map.collision.forbid(new Rect(20,20,0,0))
  map.generate.create_building(20,20,2)
  #creating a building out of bound should not work
  map.generate.create_building(-1,0,2)
  #creating a building out of bound on the other side
  map.generate.create_building(99,0,2)
  #a building this size can't be generated
  map.generate.create_building(23,23,1)
  #generate a building this size: 2
  map.generate.create_building(10,23,2)
  #generate a building this size: 5
  map.generate.create_building(14,23,5)