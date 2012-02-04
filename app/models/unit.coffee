class Unit
  constructor: (@x, @y, @name, @type) ->
    @goal_x = @x
    @goal_y = @y
    @body = new Body(@type)
    @hostility = 0  #0 is friendly. 1 is hostile
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
  act_on_queue: () ->
    if @perform == @order || @queue.length == 0
      return true
    return false
  set_action: (map) ->
    return if this.act_on_queue()
    switch(@queue[@order])
      when "move_to_drop"
        object = @job.get_drop_location(map)
        if object == false
          @job = null
          @queue = []
          @perform = null
          return
        this.set_move(object.x,object.y)
      when "move_to_crystal"
        object = @job.nearest
        this.set_move(object.x,object.y)
      when "gather_crystal"
        this.acquire_crystal(@job.nearest.gather())
      when "drop_crystal"
        this.drop_crystal()
        map.drop_crystal(@job.drop.x,@job.drop.y)
    @perform = @order
  drop_crystal: () ->
    i = 0
    for item in @inventory
      if item == "crystal"
        break
      i += 1
    @inventory.slice(i,0)
  acquire_crystal: (thing) ->
    @inventory.push(thing)
  set_move: (x,y) ->
    @goal_x = x
    @goal_y = y
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
  nullify_target: () ->
    return false if @target == null
    if @target.body.check_death() == true
      target = @target
      @target = null
      @kills.push(target.name)
      return (actors: [this.name,target.name],action: "killed")
    return false
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
