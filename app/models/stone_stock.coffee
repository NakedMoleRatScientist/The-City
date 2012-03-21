class StoneStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "stone_stockpile"
    @store = "stone"
    @jobs[0].find = @store
    @priority = 4
    @diameter = 5
    @queue = false
    @target = null
    @jobs.push(new Job(["find", "quarry"]))
  collide: () -> true