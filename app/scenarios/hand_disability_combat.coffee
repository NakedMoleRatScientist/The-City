handDisabilityCombat = (units,map) ->
  unit.create new Human(10,10, "nofight",0)
  unit.create new Human(10,20, "Target",1)
  unit.units[0].body.hand = 2
  unit.units[0].target = unit.units[1]
