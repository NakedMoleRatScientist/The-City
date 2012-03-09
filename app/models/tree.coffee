class Tree
  constructor: (@x,@y) ->
    @pile = 50
    @name = "tree"
  collide: () ->
    true
  action: () ->
    "cut_down"