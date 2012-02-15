class Units
  constructor: (@map) ->
    @units = []
    @msg_manager = new MsgManager()
    @fatalities = 0
    @advance = true
    @frame = 0
  create: (unit) ->
    @units.push(unit)
  move: () ->
    for unit in @units
      if @frame % unit.agility == 0
        unit.set_action(@map,this)
        unit.move()
    @msg_manager.determine_combat_msg(unit.attack()) for unit in @units
    @msg_manager.combat_death(unit.nullify_target()) for unit in @units
    @frame += 1
  clean: () ->
    for unit in @units
      if unit.body.check_death() == true && unit.hostility == 0
        @fatalities += 1
    @units = (unit for unit in @units when unit.body.check_death() == false)
    @units = (unit for unit in @units when unit.leave == false)
  kills: () ->
    k = 0
    for u in @units when u.hostility == 0
      k += u.kills.length
  hostile_filter: (hostile) ->
    u for u in @units when u.hostility == hostile
  killers: () ->
    killers = []
    for u in @units when u.hostility == 0
      killers.push(name: u.name, kills: u.kills.length)
    return killers
  find_killer: (name) ->
    for u in @units when u.hostility == 0
      if u.name == name
        return u.kills
  tells: (msg,type) ->
    units = this.hostile_filter(type)
    for u in units
      u.receive_msg(msg)
  generate_boars: () ->
    existing_boars = 0
    for u in @units
      if u.type == 2
        existing_boars += 1
    if existing_boars == 0
      size = random_number(3)
      while existing_boars != size + 1
        existing_boars += 1
        @units.push new Lightboar(0,random_number(10),"lightboar" + (existing_boars))
