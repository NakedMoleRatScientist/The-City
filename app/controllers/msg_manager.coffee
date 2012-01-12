class MsgManager
  constructor: () ->
    @relations = []
  combat_relation: (unit_one,unit_two) ->
    msg = "engaged in mortal combat with"
    @relations.push new Relation(unit_one,unit_two,msg)