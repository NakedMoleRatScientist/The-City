class Stockpile
  constructor: (@x,@y) ->
    @persons = []
    @nearest = null
    @drop = null
    @finish = false
    @width = 4
    @height = 4
    @jobs = []
    @jobs.push(new Job(["move_to_source","gather_item","move_to_drop","drop_item"]))
  check_assign: () ->
    n = 0
    for j in @jobs
      if j.assigned.length > 0
        n += 1
    if n == @jobs.length
      return true
    false
  rect: () ->
    return (x: @x - 2,y: @y - 2, width: @width, height: @height)
  create_drop: (map) ->
    locations = map.free_locations(@x,@y,2)
    if locations.length == 0
      @finish = true
      return false
    @drop = nearest_object(this,locations)
  find_nearest: (map,name) ->
    list = map.dest.exclude(map.decide_list(name),this)
    @nearest = nearest_object(this,list)
    return @nearest

  get_drop_location: (map) ->
    if @drop == null
      if this.create_drop(map) == false
        return false
    else if @drop.fullness() == true
      if this.create_drop(map) == false
        return false
    return @drop
