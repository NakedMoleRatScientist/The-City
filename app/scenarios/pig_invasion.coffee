pigInvasion = (units,map) ->
  units.create new Lightboar(0,4, "pigboy",0)
  units.create new Lightboar(3,3, "pigone",0)
  units.create new Lightboar(2,3, "pigtwo",0)
  units.create new Lightboar(20,15,"pigthree",0)
  units.units[1].order = null
  units.units[2].order = null
  units.units[3].order = null
  map.sketch.create_crystal(5,5)
  map.drop_crystal(5,5)
