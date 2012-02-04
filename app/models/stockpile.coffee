class Stockpile
  constructor: (@x,@y) ->
    @piles = []
    @persons = []
    @nearest = null
    @drop = null
    @finish = false
  check_assign: () ->
    if @persons.length == 0
      return false
    return true
  create_drop: (map) ->
    locations = map.free_locations(@x,@y)
    location = nearest_object(this,locations)
    if location == null
      @finish = true
    @drop = map.create_crystal(location.x,location.y)
  get_drop_location: (map) ->
    if @drop == null
      this.create_drop(map)
    else if @drop.fullness() == true
      this.create_drop(map)
    return @drop