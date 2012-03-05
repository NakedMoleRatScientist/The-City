class ScenarioInitialize
  constructor: (@units,@map) ->
  create: (name) ->
    @name = name
    this.run()
  run: () ->
    switch(@name)
      when "combat"
        combat(@units,@map)
      when "leg_disability"
        legDisability(@units,@map)
      when "pig_invasion"
        pigInvasion(@units,@map)
      when "hand_disability_combat"
        handDisabilityCombat(@units,@map)
      when "hand_disability_gathering"
        handDisabilityGathering(@units,@map)
      when "full_test_boars"
        fullTestBoars(@units,@map)
      when "pathfinding"
        pathfinding(@units,@map)
      when "unpathable_1"
        unpathable1(@units,@map)
      when "unpathable_2"
        unpathable2(@units,@map)
      when "terrain_test"
        @map.generate.create_building(10,10,3)
        @map.sketch.create_crystal(11,11)
        #This building won't be generated
        @map.generate.create_building(9,9,1)
        @map.generate.create_building(13,14,3)
        #creating crystal pile on wall shouldn't be possible
        @map.sketch.create_crystal(10,10)
        #on top of a forbidden position, a building can't be generated
        @map.sketch.forbid(new Rect(20,20,0,0))
        @map.generate.create_building(20,20,2)
        #creating a building out of bound should not work
        @map.generate.create_building(-1,0,2)
      else
        @map.sketch.forbid(new Rect(10,10,0,0))
        @map.sketch.forbid(new Rect(12,10,0,0))
        @map.generate.generate()
        @units.create new Human(10,10, "Killy",0)
        @units.units[0].stance = 1
        @units.create new Human(12,10, "Cibo",1)
        @units.units[1].stance = 1