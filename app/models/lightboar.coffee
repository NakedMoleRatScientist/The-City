class Lightboar extends Unit
  constructor: (x,y,name,gender) ->
    super(x,y,2,name,gender)
    @hostility = 1
    @queue = ["decide","act","move_to_escape","escape"]
    @order = 0
    @agility = 6
  set_action: (map,controller) ->
    return if this.act_on_queue()
    switch(@queue[@order])
      when "decide"
        crystal = nearest_object(this,map.crystals)
        if crystal == null
          @advance = false
          return
        @advance = true
        choices = map.free_location(crystal.x,crystal.y,1)
        choice = choices[random_number(choices.length)]
        this.set_move(choice.x,choice.y)
          # @decide = "attack"
          # object = nearest_object(this,controller.hostile_filter(0))
          # if object == null
          #   @order = 2
          #   return
          # @advance = true
          # @target = object
      when "act"
        this.acquire_item(map.acquire(@goal_x,@goal_y))
      when "move_to_escape"
        object = nearest_edge(this)
        this.set_move(object.x,object.y)
      when "escape"
        controller.tells("escape",1)
        @leave = true
    @perform = @order
  receive_msg: (msg) ->
    switch(msg)
      when "escape"
        @order = 2
        @advance = true
