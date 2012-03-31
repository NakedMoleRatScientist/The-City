class Relation
  constructor: () ->
    @msgs = []
    @actions = []
    @prority = []
  last: () ->
    @msgs[@msgs.length - 1]
  last_action: () ->
    @actions[@actions.length - 1]
  add_msg: (msg) ->
    @msgs.push(msg)
    @prority.push(0)
  push_action: (action,x,y) ->
    @actions.push(msg: action, x: x, y: y)
