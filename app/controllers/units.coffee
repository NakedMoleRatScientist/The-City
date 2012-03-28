class Units
  constructor: (@map,@msgs) ->
    this.setup()
  setup: () ->
    @units = []
    @fatalities = 0
    @advance = true
    @frame = 0
    @finder = new Pathfinder(@map)
  create: (unit) ->
    @units.push(unit)
  move: () ->
    for unit in @units
      if @frame % unit.agility == 0
        @msgs.determine_resource_msg(unit.set_action(@map,this))
        unit.combat.detect(this)
        @msgs.combat.determine_msg(unit.combat.attack())
        unit.move(@finder)
    if @frame % 1000 == 0
      if @map.items_total() > 50 && random_number(5) == 0
        this.generate_boars()
    @msgs.combat.death(unit.combat.nullify_target()) for unit in @units
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
    k
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
        name = random_number(100)
        @units.push new Lightboar(0,random_number(100),"lightboar" + name)
  reset: () ->
    this.setup()