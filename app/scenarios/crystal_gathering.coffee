crystal_gathering = (units,map) ->
  units.create new Human(10,10,"gatherer",0)
  location = (x: 300, y: 300, build: "crystal")
  map.dest.add_stockpile(location)
  map.generate.create_tree(20,20)
