class Unit
  # For gender: 0 for boy. 1 for girl
  constructor: (@x,@y,@type,@name,@gender) ->
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
    @move_list = []
  auto_detect_target: (units) ->
    if @target == null && @hostility == 0
      list = units.hostile_filter(1)
      if list.length == 0
        return
      @target = list[random_number(list.length)]
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
  at_goal_check: () ->
    if (@y == @goal_y && @x == @goal_x || @goal_x == -1)
      return true
    return false
  move: (finder) ->
    return if @body.leg == 2
    return if this.at_goal_check()
    if @move_list.length == 0
      result = finder.decide(this,(x: @goal_x, y: @goal_y))
      if result != -1
        @move_list = result
        @goal_x = -1
    else
      movement = @move_list[0]
      @x = movement.x
      @y = movement.y
      @move_list.shift()
      if this.at_goal_check()
        this.next_order()
  next_order: () ->
    if @advance == false || @target != null
      return
    if @order != null
      @order += 1
    if @order > @queue.length
      @order = 0
  is_next_to_target: () ->
    if distance_between_two_points(this,@target) == 1
      return true
    return false
  determine_direction: () ->
    goal = nearest_object(this,approachesList(@target))
    this.set_move(goal.x,goal.y)
  attack: () ->
    return -1 if @target == null
    if this.is_next_to_target() && @body.hand != 2
      if @target.stance == 1
        @target.target = this
      action = this.counteraction(@target)
      if action == false
#        @target.target = this if @target.target == null
        return [@target.damage(this)]
      else if action.ability == false
        return [action,@target.damage(this)]
      return [action]
    else
      this.determine_direction()
    return -1
  nullify_target: () ->
    return false if @target == null
    data = (actors: [this.name,@target.name], action: null)
    if @target.body.check_death() == true
      @kills.push(@target.name)
      @target = null
      data.action = "killed"
      return data
    else if @target.leave == true
      @target = null
      data.action = "escaped"
      return data
    return false
  counteraction: (@target) ->
    act = random_number(6)
    for i in [0..2]
      if act == i
        return @target.dodge(this)
    return false
  dodge: (target) ->
    list = approachesList(target)
    result = nearest_object(this,list)
    if this.body.leg == 2
      ability = false
    else
      ability = true
      loop
        choice = list[random_number(list.length)]
        if choice.x != result.x || choice.y != result.y
          @x = choice.x
          @y = choice.y
          break
    return (actors: [this.name,target.name], action: "dodge", ability: ability)

  damage: (unit) ->
    part = random_number(@body.parts.length)
    damage = @body.parts[part].interact()
    object = (actors: [unit.name,this.name], part: damage.part, type: damage.type, cause: damage.cause, special: null, action: "strike", protect: damage.protect)
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