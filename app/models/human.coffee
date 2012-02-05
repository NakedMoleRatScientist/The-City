class Human extends Unit
  constructor: (x, y, name) ->
    super(x, y, 1,name)
    @hostility = 0  #0 is friendly. 1 is hostile
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
        this.acquire_item(@job.nearest.gather())
      when "drop_crystal"
        this.drop_item("crystal")
        map.drop_crystal(@job.drop.x,@job.drop.y)
    @perform = @order
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
