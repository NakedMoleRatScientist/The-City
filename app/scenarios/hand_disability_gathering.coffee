handDisabilityGathering = (units,map) ->
  unit.create new Human(10,10,"gatherer",0)
  unit.units[0].body.hand = 2
  location = (x: 300, y: 300)
  map.add_stockpile(location)