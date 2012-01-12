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
    return if @target == null || !@body.check_combat_ability()
    @goal_x = @target.x - 1
    @goal_y = @target.y - 1
    if (@target.x + 1) == @x || (@target.x - 1) == @x
      if (@target.y + 1) == @y || (@target.y - 1) == @y
        if (Math.random() * 10) > 5
         @target.damage(this)
         if @target.body.check_death() == true
           @msg.push(@target.name + " got killed!")
           @target = null
  damage: (unit) ->
    part = Math.floor(Math.random() * @body.parts.length)
    damage = @body.parts[part].interact()
    switch damage.type
      when 0
        @msg.push(@name + "'s " + damage.msg)
      when 1
        @msg.push(@name + " dies of " + damage.msg)
        @body.death = 1
      when 2
        switch @body.update_ability(damage.damage)
          when "hand"
            @msg.push(@name + " suffers hand damage!")
          when "hand_destroy"
            @msg.push(@name + " 's lost all hands function")


   get_msg: () ->
     msg = @msg
     @msg = []
     return msg