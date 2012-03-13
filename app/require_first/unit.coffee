class Unit
  # For gender: 0 for boy. 1 for girl
  constructor: (@x,@y,@type,@name,@gender) ->
    @body = new Body(@type)
    @goal_x = @x
    @goal_y = @y
    @kills = []
    @inventory = []
    @job = null
    @queue_type = null
    @queue = []
    @order = null
    @perform = null
    @leave = false
    @advance = false
    @stance = 0 #1 for assualt. 0 for ignore. 2 for dodging.
    @move_list = []
    @combat = new unitCombat(this)
  set_job: (job) ->
    @job = job
    @queue_type = job.get_type()
    @queue = job.jobs[@queue_type].orders
    @job.jobs[@queue_type].assigned.push(this)
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
  at_goal_check: () ->
    if (@y == @goal_y && @x == @goal_x) || @goal_x == -1
      return true
    return false
  move: (finder) ->
    return if @body.leg == 2
    if this.at_goal_check()
      this.next_order()
      return
    if @move_list.length == 0
      result = finder.calculate_path((x: @x, y: @y),(x: @goal_x, y: @goal_y))
      if result == false
        @goal_x = -1
      else
        @move_list = result
    else
      movement = @move_list[@move_list.length - 1]
      @x = movement.x
      @y = movement.y
      @move_list.pop()

  next_order: () ->
    if @advance == false || @combat.target != null
      return
    if @order != null
      @order += 1
    if @order == @queue.length
      @order = 0