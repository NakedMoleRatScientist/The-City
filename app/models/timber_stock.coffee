class timberStock extends Stockpile
  constructor: (x,y) ->
    super(x,y)
    @name = "timber_stockpile"
    @store = "timber"
    @priority = 4
    @diameter = 5
    @size = 10
    @queue = false
    @times = 24
    @type = "cut"
    @target = null
    @orders = ["find", "cut_down"]
  find_nearest_cut: (map) ->
    @targets = map.trees.concat(map.logs)
    unless @targets.length == 0
      @target = nearest_object(this,@targets)
      return @target
    false
  collide: () ->
    true