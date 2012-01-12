class MsgManager
  constructor: () ->
    @relations = []
  create_combat_relation: (unit_one,unit_two) ->
    msg = "engaged in mortal combat with"
    @relations.push new Relation([unit_one,unit_two],msg)
  find_relation: (unit_one,unit_two) ->
    for r in @relations
      if unit_one in r.actors && unit_two in r.actors
        return r
    return false
  find_or_create_combat_relation: (unit_one,unit_two) ->
    n = find_relation(unit_one,unit_two)
    if n == false
      create_combat_relation(unit_one,unit_two)
      n = @relations.length - 1
    return n
  append_message: (unit_one,unit_two,msg) ->
    n = find_or_create_combat_relation(unit_one,unit_two)
    @relations[n].add_msg(unit_one,unit_two,msg)
  combat_death: (object) ->
    append_message(object.actors,object.action)
  strike: (object) ->
    msg = "strikes " + object.part
    append_message(object.actors,msg)