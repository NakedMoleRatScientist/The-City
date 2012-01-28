class Units
  constructor: (scenario,@map) ->
    @units = []
    @msg_manager = new MsgManager()
    @fatalities = 0
  initialize_scenario: (name) ->
    switch(name)
      when "combat"
        @units.push new Unit(10,10, "Miya",1)
        @units.push new Unit(10,20, "John",1)
        @units[0].target = @units[1]
      when "leg_disability"
        @units.push new Unit(10,10, "Can'tWalk",1)
        @units[0].body.leg = 2
        @units[0].set_move(20,20)
      else
        @units.push new Unit(10,10, "Killy",1)
        @units.push new Unit(12,10, "Cibo",1)
  move: () ->
    unit.move() for unit in @units
    @msg_manager.strike(unit.attack()) for unit in @units
    @msg_manager.combat_death(unit.nullify_target()) for unit in @units
  clean: () ->
    for unit in @units
      if unit.body.check_death() == true && unit.hostility == 0
        @fatalities += 1
    @units = (unit for unit in @units when unit.body.check_death() == false)
  kills: () ->
    k = 0
    for u in @units when u.hostility == 0
      k += u.kills.length
  killers: () ->
    killers = []
    for u in @units when u.hostility == 0
      killers.push(name: u.name, kills: u.kills.length)
    return killers
  find_killer: (name) ->
    for u in @units when u.hostility == 0
      if u.name == name
        return u.kills
