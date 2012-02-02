class CrystalTree
  constructor: (@x,@y) ->
    @pile = 50
    @name = "crystal_tree"
  collide: () ->
    true
  gather: () ->
    @pile -= 1
    return "crystal"