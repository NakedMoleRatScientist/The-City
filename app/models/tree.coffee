class Tree
  constructor: (@x,@y) ->
    @pile = 50
    @name = "tree"
  collide: () ->
    true
  acquire: () ->
    @pile -= 1
    return "tree"
  action: () ->
    "cut_down"