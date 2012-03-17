fullTestBoars = (units,map) ->
  map.sketch.create("crystal",20,20)
  map.map[20][20].items = 50
  units.generate_boars()
  units.create new Human(10,10, "grumpy_killer",0)