class Relation
  constructor: () ->
    @msgs = []
  last: () ->
    @msgs[@msgs.length - 1]
  add_msg: (msg) ->
    @msgs.push(msg)
