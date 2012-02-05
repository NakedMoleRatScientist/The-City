class Units
  constructor: (@map) ->
    @units = []
    @msg_manager = new MsgManager()
    @fatalities = 0
  initialize_scenario: (name) ->
    switch(name)
      when "leg_disability"
        @units.push new Human(10,10, "Can'tWalk")
        @units[0].body.leg = 2
        @units[0].set_move(20,20)
      when "pig_invasion"
        @units.push new Human(10,10, "defender")
        @units.push new Lightboar(0,100, "pigboy")
      else
        @units.push new Human(10,10, "Killy")
        @units.push new Human(12,10, "Cibo")
  move: () ->
    for unit in @units
      unit.set_action(@map,this)
      unit.move()
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
