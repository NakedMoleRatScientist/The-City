class Stockpile
  constructor: (@x,@y) ->
    @persons = []
    @nearest = null
    @drop = null
    @finish = false
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
    @drop = map.create_crystal(location.x,location.y)
  get_drop_location: (map) ->
    if @drop == null
      this.create_drop(map)
    else if @drop.fullness() == true
      if this.create_drop(map) == false
        return false
    return @drop
