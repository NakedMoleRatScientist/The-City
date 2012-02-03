class Stockpile
  constructor: (@x,@y) ->
    @piles = []
    @persons = []
    @nearest = null
    @drop = null
  check_assign: () ->
    if @persons.length == 0
      return false
    return true
  create_drop: (map) ->
    locations = map.free_locations(@x,@y)
    location = nearest_object(this,locations)
    @drop = location
  get_drop_location: (map) ->
    if @drop == null
      this.create_drop(map)