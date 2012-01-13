class Relation
  constructor: (@actors,@action) ->
    @msgs = []
  add_msg: (unit_one,unit_two,act) ->
    @msgs.push(unit_one + " " + act + " " + unit_two)
  last: () ->
    @msgs[@msgs.length - 1]