class Units
  constructor: (@map) ->
    @units = []
    @msg_manager = new MsgManager()
    @fatalities = 0
  create: (unit) ->
    @units.push(unit)
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

  generate_boars: () ->
    existing_boars = 0
    for u in @units
      if u.type == 2
        existing_boars += 1
    if existing_boars == 0
      @units.push new Lightboar(x,y,"lightboar" + (existing_boars + 1))
