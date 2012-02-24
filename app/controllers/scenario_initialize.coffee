class ScenarioInitialize
  constructor: (@units,@map) ->
  create: (name) ->
    switch(name)
      when "combat"
        @units.create new Human(10,10,"Miya",1)
        @units.create new Human(10,20, "John",0)
        @units.units[0].target = @units.units[1]
        @units.units[1].stance = 1
      when "leg_disability"
        @units.create new Human(10,10, "Can'tWalk",0)
        @units.units[0].body.leg = 2
        @units.units[0].set_move(20,20)
      when "pig_invasion"
        @units.create new Lightboar(0,4, "pigboy",0)
        @units.create new Lightboar(3,3, "pigone",0)
        @units.create new Lightboar(2,3, "pigtwo",0)
        @units.create new Lightboar(20,15,"pigthree",0)
        @units.units[1].order = null
        @units.units[2].order = null
        @units.units[3].order = null
        @map.sketch.create_crystal(5,5)
        @map.drop_crystal(5,5)
      when "hand_disability_combat"
        @units.create new Human(10,10, "nofight",0)
        @units.create new Human(10,20, "Target",1)
        @units.units[0].body.hand = 2
        @units.units[0].target = @units.units[1]
      when "hand_disability_gathering"
        @units.create new Human(10,10,"gatherer",0)
        @units.units[0].body.hand = 2
        location = (x: 300, y: 300)
        @map.add_stockpile(location)
      when "full_test_boars"
        @map.sketch.create_crystal(20,20)
        @map.map[20][20].items = 50
        @units.generate_boars()
        @units.create new Human(10,10, "grumpy_killer",0)
      when "pathfinding"
        @units.create new Human(10,10, "pathfinder",0)
        @map.sketch.create_wall(15,10)
        @map.sketch.create_wall(15,11)
        @map.sketch.create_wall(15,9)
        @units.units[0].set_move(20,10)
        @units.units[0].agility = 25
      else
        @units.create new Human(10,10, "Killy",0)
        @units.units[0].stance = 1
        @units.create new Human(12,10, "Cibo",1)
        @units.units[1].stance = 1
