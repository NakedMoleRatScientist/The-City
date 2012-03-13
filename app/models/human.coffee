class Human extends Unit
  constructor: (x, y, name,gender) ->
    super(x, y, 1,name,gender)
    @hostility = 0
    @advance = true
    @agility = 5
  gather_action: (map) ->
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
        object = @job.find_nearest_cut(map)
        if object == false
          @job = null
          @queue = []
          @perform = null
          return
        choices = map.free_locations(object.x,object.y,1)
        choice = choices[random_number(choices.length)]
        this.set_move(choice.x,choice.y)
      when "cut_down"
        direction = (x: -1, y: 0)
        map.sketch.cut_down(@job.target.x,@job.target.y,direction)
  set_action: (map) ->
    return if this.act_on_queue()
    return if @body.hand == 2
    switch (@queue_type)
      when 0
        this.gather_action(map)
      when 1
        this.cut_action(map)
    @perform = @order
