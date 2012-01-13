class MsgManager
  constructor: () ->
    @relations = []
    @last_status = -1
  create_combat_relation: (unit_one,unit_two) ->
    msg = "engaged in mortal combat with"
    @relations.push new Relation([unit_one,unit_two],msg)
  find_relation: (unit_one,unit_two) ->
    for r in @relations
      if unit_one in r.actors && unit_two in r.actors
        return r
    return false
  find_or_create_combat_relation: (unit_one,unit_two) ->
    n = this.find_relation(unit_one,unit_two)
    if n == false
      this.create_combat_relation(unit_one,unit_two)
      n = @relations.length - 1
    return n
  active_msg: (unit_one,unit_two,msg) ->
    n = this.find_or_create_combat_relation(unit_one,unit_two)
    @relations[n].add_msg(unit_one,unit_two,msg)
    @last_status = n
    return n
  combat_death: (object) ->
    return if object == false
    this.active_msg(object.actors,object.action)
  strike: (object) ->
    msg = "strikes " + object.part
    this.active_msg(object.actors,msg)
    msg = "'s " + object.part + " suffers damage!"
    this.passive_msg(object.actors[1],msg)