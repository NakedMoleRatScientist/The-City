pigInvasion = (units,map) ->
  unit.create new Lightboar(0,4, "pigboy",0)
  unit.create new Lightboar(3,3, "pigone",0)
  unit.create new Lightboar(2,3, "pigtwo",0)
  unit.create new Lightboar(20,15,"pigthree",0)
  unit.units[1].order = null
  unit.units[2].order = null
  unit.units[3].order = null
  map.sketch.create_crystal(5,5)
  map.drop_crystal(5,5)
