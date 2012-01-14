class MsgManager
  constructor: () ->
    @relations = []
    @last_status = -1
  create_combat_relation: (unit_one,unit_two) ->
    msg = "engaged in mortal combat with"
    @relations.push new Relation([unit_one,unit_two],msg)
    return (@relations.length - 1)
  find_relation: (unit_one,unit_two) ->
    n = 0
    for r in @relations
      n += 1
      if unit_one in r.actors && unit_two in r.actors
        return n
    return false
  find_or_create_combat_relation: (unit_one,unit_two) ->
    n = this.find_relation(unit_one,unit_two)
    if n == false
      this.create_combat_relation(unit_one,unit_two)
    return n
  active_msg: (unit_one,unit_two,msg) ->
    n = this.find_or_create_combat_relation(unit_one,unit_two)
    @relations[n].add_msg(unit_one,unit_two,msg)
    @last_status = n
    return n
  passive_msg: (unit_one,unit_two,msg) ->
    n = this.find_or_create_combat_relation(unit_one,unit_two)
    @relations[n].add_passive_msg(unit_two, msg)
    @last_status = n
  get_last_update: () ->
    return -1 if @last_status == -1
    @relations[@last_status].last()
  combat_death: (object) ->
    return if object == false
    this.active_msg(object.actors[0],object.actors[1],object.action)
  strike: (object) ->
    return if object == -1
    part = object.part
    msg = "strikes " + part
    this.active_msg(object.actors[0],object.actors[1],msg)
    msg = "'s " + part + " suffers damage!"
    this.passive_msg(object.actors[0],object.actors[1],msg)
