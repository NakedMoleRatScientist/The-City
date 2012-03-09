handDisabilityGathering = (units,map) ->
  units.create new Human(10,10,"gatherer",0)
  units.units[0].body.hand = 2
  location = (x: 300, y: 300)
  map.dest.add_stockpile(location)