class unitCombat
  constructor: (@unit) ->
    @target = null
  detect: (units) ->
    if @target == null && @hostility == 0
      list = units.hostile_filter(1)
      if list.length == 0
        return
      @target = list[random_number(list.length)]
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