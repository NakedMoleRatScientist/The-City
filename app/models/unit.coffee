class Unit
  constructor: (@x, @y, @name, @type) ->
    @goal_x = @x
    @goal_y = @y
  set_move: (x,y) ->
    @goal_x == x
    @goal_y == y
  move: ->
    if @x - @goal_x < 0
      @x = @x + 1