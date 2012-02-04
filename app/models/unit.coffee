class Unit
  constructor: (@x,@y,@type,@name) ->
    @body = new Body(@type)
    @goal_x = @x
    @goal_y = @y