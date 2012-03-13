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
        return @target.dodge(this)
    return false

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
