class CombatRelation
  constructor: (@actors) ->
    @msgs = []
  add_msg: (msg) ->
    @msgs.push(msg)
  add_passive_msg: (unit_two,msg) ->
    @msgs.push(unit_two + msg)
  last: () ->
    @msgs[@msgs.length - 1]
  summary: () ->
    @actors[0] + " and " + @actors[1] + " are engaged in mortal combat!"
