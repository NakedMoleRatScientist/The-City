class CrystalTree
  constructor: (@x,@y) ->
    @pile = 50
    @name = "crystal_tree"
    @width = 0
    @height = 0
  collide: () ->
    true
  acquire: () ->
    @pile -= 1
    return "crystal"