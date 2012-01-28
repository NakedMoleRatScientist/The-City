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
    @order = 0
  set_queue: () ->
    switch(@queue[@order])
      when "crystal_move"
        this.set_move(@job.x,@job.y)
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
    part = Math.floor(Math.random() * @body.parts.length)
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
