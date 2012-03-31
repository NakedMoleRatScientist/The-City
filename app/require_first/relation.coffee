class Relation
  constructor: () ->
    @msgs = []
    @actions = []
    @priority = []
  last: () ->
    @msgs[@msgs.length - 1]
  last_action: () ->
    @actions[@actions.length - 1]
  add_msg: (msg) ->
    @msgs.push(msg)
    @priority.push(0)
  push_action: (action,x,y) ->
    @actions.push(msg: action, x: x, y: y)
  change_priority: (i) ->
   @priority[@priority.length - 1] = i
