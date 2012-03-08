class TreeStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "tree_stockpile"
    @store = "wood"
    @priority = 4
    @diameter = 5
    @size = 10
    @queue = false
    @orders = ["move_to_source","gather_item","move_to_drop","drop_item"]
  collide: () ->
    true