combat = (units,map) ->
  units.create new Human(10,10,"Miya",1)
  units.create new Human(10,20, "John",0)
  units.units[0].target = units.units[1]
  units.units[1].stance = 1
