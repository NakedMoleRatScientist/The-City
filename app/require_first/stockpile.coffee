class Stockpile
  constructor: (@x,@y) ->
    @persons = []
    @nearest = null
    @drop = null
    @finish = false
    @jobs = []
    @jobs.push(new Job(["move_to_source","gather_item","move_to_drop","drop_item"]))
  check_assign: () ->
    if @persons.length == 0
      return false
    return true
  create_drop: (map) ->
    locations = map.free_locations(@x,@y,2)
    if locations.length == 0
      @finish = true
      return false
    location = nearest_object(this,locations)
    switch(@store)
      when "crystal"
        map.sketch.create("crystal",location.x,location.y)
        @drop = map.select_by_name('crystal',location.x,location.y)
      when "timber"
        map.sketch.create("timber",location.x,location.y)
        @drop = map.select_by_name('timber',location.x,location.y)
  get_drop_location: (map) ->
    if @drop == null
      if this.create_drop(map) == false
        return false
    else if @drop.fullness() == true
      if this.create_drop(map) == false
        return false
    return @drop
