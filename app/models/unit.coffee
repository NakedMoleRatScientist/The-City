class Unit
  constructor: (@x, @y, @name, @type) ->
    @goal_x = @x
    @goal_y = @y
    @body = new Body(@type)
    @hostility = 0  #0 is friendly. 1 is hostile
    @alive = 1 #1 is alive, 0 is dead.
    @msg = []
    @target = null
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
  attack: () ->
    return if @target == null
    @goal_x = @target.x - 1
    @goal_y = @target.y - 1
    if (@target.x + 1) == @x || (@target.x - 1) == @x
      if (@target.y + 1) == @y || (@target.y - 1) == @y
        if (Math.random() * 10) > 5
         @target.damage(this)
  damage: (unit) ->
    part = Math.floor(Math.random() * @body.parts.length)
    @body.parts[part].status = 1
    @msg.push(unit.name + " destroy the " + @body.parts[part].name + " of " + @name)
    if @body.check_death() == true
      @msg.push(@name + " got killed!")
      @target = null
   get_msg: () ->
     msg = @msg
     @msg = []
     return msg