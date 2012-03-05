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
        terrainTest(@units,@map)
      else
        @map.sketch.forbid(new Rect(10,10,0,0))
        @map.sketch.forbid(new Rect(12,10,0,0))
        @map.generate.generate()
        @units.create new Human(10,10, "Killy",0)
        @units.units[0].stance = 1
        @units.create new Human(12,10, "Cibo",1)
        @units.units[1].stance = 1