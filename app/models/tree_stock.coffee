class WoodStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "wood_stockpile"
    @store = "wood"
    @priority = 4
    @diameter = 5
    @size = 10
    @queue = false
  collide: () ->
    true