class CombatRelation extends Relation
  constructor: (@actors) ->
    @summary = @actors[0] + " and " + @actors[1] + " are engaged in mortal combat!"
  add_passive_msg: (unit_two,msg) ->
    @msgs.push(unit_two + msg)
