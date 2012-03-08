class TreeStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "tree_stockpile"
    @store = "wood"
    @priority = 4
    @diameter = 5
    @size = 10
    @queue = false
    @orders = ["move_to_crystal","gather_crystal","move_to_drop","drop_crystal"]
  collide: () ->
    true