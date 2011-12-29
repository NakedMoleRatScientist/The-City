class Unit
  constructor: (@x, @y, @name, @type) ->
    @goal_x = @x
    @goal_y = @y
    @body = new Body(@type)
    @hostility = 0  #0 is friendly. 1 is hostile
    @msg = []
  set_move: (x,y) ->
    @goal_x = x
    @goal_y = y
  move: () ->
    if (@x - @goal_x) < 0
      @x = @x + 1
      return
    else if (@x - @goal_x) > 0
      @x = @x - 1
      return
    if (@y - @goal_y) < 0
      @y = @y + 1
      return
    else if (@y - @goal_y) > 0
      @y = @y - 1
      return
  attack: (unit) ->
    if (unit.x + 1) == @x || (unit.x - 1) == @x
      if (unit.y + 1) == @y || (unit.y - 1) == @y
        if Math.random * 10 > 5
         unit.damage(this)
  damage: (unit) ->
    part = Math.random * @body.parts.size
    @body.parts[part] = 1
    @msg.push(unit.name + " destorys the " @body.parts[part].name + " of " + @name)