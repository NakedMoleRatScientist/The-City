class timberStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "timber_stockpile"
    @store = "timber"
    @priority = 4
    @diameter = 5
    @size = 10
    @width = 4
    @height = 4
    @queue = false
    @times = 24
    @target = null
    @jobs.push(new Job(["find", "cut_down"]))
  get_type: () ->
    i = 0
    for j in @jobs
      if j.assigned.length == 0
        return i
      i += 1
  find_nearest_cut: (map) ->
    @targets = map.trees.concat(map.logs)
    unless @targets.length == 0
      @target = nearest_object(this,@targets)
      return @target
    false
  collide: () ->
    true