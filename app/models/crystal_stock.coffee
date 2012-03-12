class CrystalStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "crystal_stockpile"
    @store = "crystal"
    @priority = 4
    @diameter = 5
    @size = 10
    @queue = false
  get_type: () ->
    "gather"
  collide: () ->
    true