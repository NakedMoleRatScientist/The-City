normalScenario = (units,map) ->
  map.sketch.forbid(new Rect(10,10,0,0))
  map.sketch.forbid(new Rect(12,10,0,0))
  map.generate.generate()
  units.create new Human(10,10, "Killy",0)
  units.units[0].stance = 1
  units.create new Human(12,10, "Cibo",1)
  units.units[1].stance = 1