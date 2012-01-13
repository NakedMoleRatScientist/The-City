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
  attack_chance: () ->
    @goal_x = @target.x - 1
    @goal_y = @target.y - 1
    if (@target.x + 1) == @x || (@target.x - 1) == @x
      if (@target.y + 1) == @y || (@target.y - 1) == @y
        if (Math.random() * 10) > 5
          return true
    return false
  attack: () ->
    return if @target == null || !@body.check_combat_ability()
    if this.attack_chance()
      return @target.damage(this)
  nullify_target: () ->
    return false if @target == null
    if @target.body.check_death() == true
      target = @target
      @target = null
      return (actors: [this.name,target.name],action: "killed")
    return false
  damage: (unit) ->
    part = Math.floor(Math.random() * @body.parts.length)
    damage = @body.parts[part].interact()
    object = (actors: actors, part: damage.msg, type: null)
    switch damage.type
      when 0
        object.type = 0
      when 1
        @body.death = 1
        object.type = 1
        @msg.push(@name + " dies of " + damage.msg)
      when 2
        switch @body.update_ability(damage.damage)
          when "hand"
            object.type = 2
          when "hand_destroy"
            object.type = 3
          when "leg"
            object.type = 4
    return object

   get_msg: () ->
     msg = @msg
     @msg = []
     return msg