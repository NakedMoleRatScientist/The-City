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
    @orders = ["find", "cut_down"]
  collide: () ->
    true