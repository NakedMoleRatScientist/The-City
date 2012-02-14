class ScenarioInitialize
  constructor: (@units,@map) ->
  create: (name) ->
    switch(name)
      when "combat"
        @units.create new Human(10,10,"Miya")
        @units.create new Human(10,20, "John")
        @units.units[0].target = @units.units[1]
      when "leg_disability"
        @units.create new Human(10,10, "Can'tWalk")
        @units.units[0].body.leg = 2
        @units.units[0].set_move(20,20)
      when "pig_invasion"
        @units.create new Lightboar(0,4, "pigboy")
        @units.create new Lightboar(3,3, "pigone")
        @units.create new Lightboar(2,3, "pigtwo")
        @units.create new Lightboar(20,15,"pigthree")
        @units.units[1].order = null
        @units.units[2].order = null
        @units.units[3].order = null
        @map.create_crystal(5,5)
        @map.drop_crystal(5,5)
      when "hand_disability_combat"
        @units.create new Human(10,10, "nofight")
        @units.create new Human(10,20, "Target")
        @units.units[0].target = @units.units[1]
      else
        @units.create new Human(10,10, "Killy")
        @units.create new Human(12,10, "Cibo")
