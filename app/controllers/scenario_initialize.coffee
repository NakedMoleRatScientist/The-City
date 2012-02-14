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
        @units.create new Human(10,10, "defender")
        @units.create new Lightboar(0,4, "pigboy")
        @map.create_crystal(5,5)
        @map.drop_crystal(5,5)
      else
        @units.create new Human(10,10, "Killy")
        @units.create new Human(12,10, "Cibo")
