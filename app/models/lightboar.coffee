class Lightboar extends Unit
  constructor: (x,y,name) ->
    super(x,y,2,name)
    @hostility = 1
    @queue = ["decide","act","move_to_escape","escape"]
    @order = 0
  set_action: (map,controller) ->
    return if this.act_on_queue()
    switch(@queue[@order])
      when "decide"
        if random_number(5) < 5
          @decide = "steal"
          object = nearest_object(this,map.stockpoints)
          if object != null
            this.set_move(object.x,object.y)
        else
          @decide = "attack"
          object = nearest_object(this,controller.units)
          if object != null
            this.set_move(object.x,object.y)
          @target = object
      when "act"
        if @decide == "steal"
          this.acquire_item(map.acquire(@target.x,@target.y))
      when "move_to_escape"
        object = nearest_edge(this)
        this.set_move(object.x,object.y)
      when "escape"
        controller.leave(this)
    @perform = @order
