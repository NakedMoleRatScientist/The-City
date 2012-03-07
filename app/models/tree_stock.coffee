class TreeStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "tree_stockpile"
    @priority = 4
    @diameter = 5
    @size = 10
    @queue = false
  collide: () ->
    true