handDisabilityCombat = (units,map) ->
  units.create new Human(10,10, "nofight",0)
  units.create new Human(10,20, "Target",1)
  units.units[0].body.hand = 2
  units.units[0].target = units.units[1]
