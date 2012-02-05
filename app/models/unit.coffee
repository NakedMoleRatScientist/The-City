class Unit
  constructor: (@x,@y,@type,@name) ->
    @body = new Body(@type)
    @goal_x = @x
    @goal_y = @y
    @target = null
    @kills = []
    @inventory = []
    @job = null
    @queue = []
    @order = null
    @perform = null
  set_job: (job) ->
    @job = job
    @queue = job.orders
  set_move: (x,y) ->
    @goal_x = x
    @goal_y = y
  act_on_queue: () ->
    if @perform == @order || @queue.length == 0
      return true
    return false
  drop_item: (name) ->
    i = 0
    for item in @inventory
      if item == name
        break
      i += 1
    @inventory.slice(i,0)
  acquire_item: (name) ->
    @inventory.push(name)
  move: () ->
    return if @body.leg == 2
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
    if @y - @goal_y == 0 && @x - @goal_x == 0
      this.next_order()
  next_order: () ->
    if @order != null
      @order += 1
    if @order > @queue.length
      @order = 0
  attack_chance: () ->
    @goal_x = @target.x - 1
    @goal_y = @target.y - 1
    if (@target.x + 1) == @x || (@target.x - 1) == @x
      if (@target.y + 1) == @y || (@target.y - 1) == @y
        if (Math.random() * 10) > 5
          return true
    return false
  attack: () ->
    return -1 if @target == null || (@body.hand == 2)
    if this.attack_chance()
      return @target.damage(this)
    return -1
