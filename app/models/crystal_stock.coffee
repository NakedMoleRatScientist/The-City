class CrystalStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "crystal_stockpile"
    @store = "crystal"
    @jobs[0].find = @store
    @priority = 4
    @diameter = 5
    @size = 10
    @queue = false
  get_type: () ->
    0
  collide: () ->
    true