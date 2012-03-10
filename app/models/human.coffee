class Human extends Unit
  constructor: (x, y, name,gender) ->
    super(x, y, 1,name,gender)
    @hostility = 0
    @advance = true
    @agility = 5
  gather_action: () ->
    switch(@queue[@order])
      when "move_to_drop"
        object = @job.get_drop_location(map)
        if object == false
          @job = null
          @queue = []
          @perform = null
          return
        choices = map.free_locations(object.x,object.y,1)
        choice = choices[random_number(choices.length)]
        this.set_move(choice.x,choice.y)
      when "move_to_source"
        object = @job.nearest
        if object == null
          @job = null
          @queue = []
          @perform = null
          return
        choices = map.free_locations(object.x,object.y,1)
        choice = choices[random_number(choices.length)]
        this.set_move(choice.x,choice.y)
      when "gather_item"
        this.acquire_item(@job.nearest.acquire())
      when "drop_item"
        this.drop_item(@job.store)
        map.drop_item(@job.drop.x,@job.drop.y,@job.store)
  cut_action: (map) ->
    switch(@queue[@order])
      when "find"
        object = find_nearest_cut(map)
        if object == false
          @job = null
          @queue = []
          @perform = null
         this.set_move(object.x,object.y)
      when "cut"
        console.log("DEEP")
  set_action: (map) ->
    return if this.act_on_queue()
    return if @body.hand == 2
    switch (@job.type)
      when "gather"
        this.gather_action()
      when "cut"
        this.cut_action()
    @perform = @order
