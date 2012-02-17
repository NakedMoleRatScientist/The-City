class Human extends Unit
  constructor: (x, y, name,gender) ->
    super(x, y, 1,name,gender)
    @hostility = 0
    @advance = true
    @agility = 5
  set_action: (map) ->
    return if this.act_on_queue()
    return if @body.hand == 2
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
        this.acquire_item(@job.nearest.acquire())
      when "drop_crystal"
        this.drop_item("crystal")
        map.drop_crystal(@job.drop.x,@job.drop.y)
    @perform = @order
