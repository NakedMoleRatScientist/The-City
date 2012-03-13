class unitCombat
  constructor: (@unit) ->
    @target = null
  detect: (units) ->
    if @target == null && @unit.hostility == 0
      list = units.hostile_filter(1)
      if list.length == 0
        return
      @target = list[random_number(list.length)]
  damage: (unit) ->
    part = random_number(@unit.body.parts.length)
    damage = @unit.body.parts[part].interact()
    object = (actors: [unit.name,this.name], part: damage.part, type: damage.type, cause: damage.cause, special: null, action: "strike", protect: damage.protect)
    switch(damage.type)
      when 1
        @unit.body.death = 1
      when 2
        switch @unit.body.update_ability(damage.damage)
          when "hand"
            object.special = 0
          when "hand_destroy"
            object.special = 1
          when "leg"
            object.special = 2
          when "leg_destroy"
            object.special = 3
    return object
  counteraction: (@target) ->
    act = random_number(6)
    for i in [0..2]
      if act == i
        return @target.combat.dodge(@unit)
    return false

  attack: () ->
    return -1 if @target == null
    if this.is_next_to_target() && @unit.body.hand != 2
      if @target.stance == 1
        @target.target = @unit
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
  dodge: (target) ->
    list = approachesList(target)
    result = nearest_object(@unit,list)
    if @unit.body.leg == 2
      ability = false
    else
      ability = true
      loop
        choice = list[random_number(list.length)]
        if choice.x != result.x || choice.y != result.y
          @unit.x = choice.x
          @unit.y = choice.y
          break
    return (actors: [@unit.name,target.name], action: "dodge", ability: ability)
  is_next_to_target: () ->
    if distance_between_two_points(@unit,@target) == 1
      return true
    return false
  determine_direction: () ->
    goal = nearest_object(@unit,approachesList(@target))
    @unit.set_move(goal.x,goal.y)
  nullify_target: () ->
    return false if @target == null
    data = (actors: [@unit.name,@target.name], action: null)
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
