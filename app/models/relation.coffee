class Relation
  constructor: (@actors,@action) ->
    @msgs = []
  add_msg: (unit_one,unit_two,act) ->
    @msgs.push(unit_one + " " + act + " " + unit_two + "!")
  add_passive_msg: (unit_two,msg) ->
    @msgs.push(unit_two + msg)
  last: () ->
    @msgs[@msgs.length - 1]