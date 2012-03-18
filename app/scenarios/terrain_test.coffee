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
  #place tree near a building
  map.generate.create_tree(9,11)
  #create closing walls
  map.sketch.create("wall",3,3,false)
  map.sketch.create("wall",5,3,false)
  map.sketch.create("wall",4,2,false)
  map.sketch.create("wall",4,4,false)
  #will not create a tree inside of the walls
  map.generate.create_tree(4,3)
  #should be at this distance
  map.generate.create_tree(11,3)
  #create wall surrounding the tree
  map.sketch.create("wall",11,2,false)
  map.sketch.create("wall",11,4,false)
  map.sketch.create("wall",12,3,false)
  #Can't create a tree
  map.generate.create_tree(10,3)
  debugger
  map.generate.create_tree(11,7)
