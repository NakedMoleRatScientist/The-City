class Tree
  constructor: (@x,@y) ->
    @name = "tree"
  collide: () ->
    true
  action: () ->
    "cut_down"