class MsgManager
  constructor: () ->
    @relations = []
    @last_status = -1
  create_combat_relation: (unit_one,unit_two) ->
    @relations.push new CombatRelation([unit_one,unit_two])
    return (@relations.length - 1)
  find_relation: (unit_one,unit_two) ->
    n = 0
    for r in @relations
      if unit_one in r.actors && unit_two in r.actors
        return n
      n += 1
    return false
  find_or_create_combat_relation: (unit_one,unit_two) ->
    n = this.find_relation(unit_one,unit_two)
    if n == false
      return this.create_combat_relation(unit_one,unit_two)
    return n
  msg: (unit_one,unit_two,msg) ->
    n = this.find_or_create_combat_relation(unit_one,unit_two)
    @relations[n].add_msg(msg)
    @last_status = n
    return n
  get_last_update: () ->
    return -1 if @last_status == -1
    @relations[@last_status].last()
  combat_death: (object) ->
    return if object == false
    msg = object.actors[0] + " " + object.action + " " + object.actors[1]
    this.msg(object.actors[0],object.actors[1],msg)
  determine_combat_msg: (object) ->
    return if object == -1
    switch(object.action)
      when "strike"
        this.strike(object)
      when "dodge"
        this.dodge(object)
  strike: (object) ->
    part = object.part
    msg = object.actors[0] + " strikes " + object.actors[1] + "'s " + part + "!"
    this.msg(object.actors[0],object.actors[1],msg)
    msg = object.actors[1] + "'s " + part + " suffers damage!"
    this.msg(object.actors[0],object.actors[1],msg)
    if object.type == 1
      msg = object.actors[1] + " dies of " + object.cause
      this.msg(object.actors[0],object.actors[1],msg)
    switch(object.special)
      when 0
        msg = object.actors[1] + " losts some hand functionality"
        this.msg(object.actors[0],object.actors[1],msg)
      when 1
        msg = object.actors[1] + " suffers hand disability"
        this.msg(object.actors[0],object.actors[1],msg)
      when 2
        msg = object.actors[1] + " losts some leg functionality"
        this.msg(object.actors[0],object.actors[1],msg)
      when 3
        msg = object.actors[1] + " losts all leg functionality"
        this.msg(object.actors[0],object.actors[1],msg)
