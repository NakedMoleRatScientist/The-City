class CrystalTree
  constructor: (@x,@y) ->
    @pile = 50
    @type = "crystal_tree"
  collide: () ->
    true