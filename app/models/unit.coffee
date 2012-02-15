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
    @leave = false
    @advance = false
    @stance = 0 #1 for assualt. 0 for ignore. 2 for dodging.
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
    if @advance == false || @target != null
      return
    if @order != null
      @order += 1
    if @order > @queue.length
      @order = 0
  is_next_to_target: () ->
    if distance_between_two_point(this,@target) == 1
      return true
    return false
  determine_approach: () ->
    approachs = []
    approachs.push(x: @target.x - 1, y: @target.y) #left of target
    approachs.push(x: @target.x + 1, y: @target.y) #right of target
    approachs.push(x: @target.x, y: @target.y - 1) #top of target
    approachs.push(x: @target.x, y: @target.y + 1) #below of target
    goal = nearest_object(this,approachs)
    this.set_move(goal.x,goal.y)
  attack: () ->
    return -1 if @target == null
    if this.next_order()
      if @body.hand != 2
#        @target.target = this if @target.target == null
        return @target.damage(this)
    else
      this.determine_approach()
    return -1
  nullify_target: () ->
    return false if @target == null
    if @target.body.check_death() == true
      target = @target
      @target = null
      @kills.push(target.name)
      return (actors: [this.name,target.name],action: "killed")
    return false
  counteraction: () ->
    act = random_number(6)
    if act == 0 || act == 1 || act == 2
      this.dodge()

  damage: (unit) ->
    part = random_number(@body.parts.length)
    damage = @body.parts[part].interact()
    object = (actors: [unit.name,this.name], part: damage.part, type: damage.type, cause: damage.cause, special: null)
    switch(damage.type)
      when 1
        @body.death = 1
      when 2
        switch @body.update_ability(damage.damage)
          when "hand"
            object.special = 0
          when "hand_destroy"
            object.special = 1
          when "leg"
            object.special = 2
          when "leg_destroy"
            object.special = 3
    return object
