class Units
  constructor: (scenario) ->
    @units = []
    @msg_manager = new MsgManager()
    if scenario == "game"
      @units.push new Unit(10,10, "Miya",1)
      @units.push new Unit(10,20, "John",1)
      @units[1].hostility = 1
      @units[0].target = @units[1]
  move: () ->
    unit.move() for unit in @units
    @msg_manager.strike(unit.attack()) for unit in @units
    @msg_manager.combat_death(unit.nullify_target()) for unit in @units
  clean: () ->
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
        return u
