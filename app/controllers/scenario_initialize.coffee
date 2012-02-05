class ScenarioInitialize
  constructor: (@units,@map) ->
  create: (name) ->
    switch(name)
      when "combat"
        @units.create new Human(10,10,"Miya")
        @units.create new Human(10,20, "John")
        @units.units[0].target = @units[1]
      when "leg_disability"
        @units.create new Human(10,10, "Can'tWalk")
        @units.units[0].body.leg = 2
        @units.units[0].set_move(20,20)
