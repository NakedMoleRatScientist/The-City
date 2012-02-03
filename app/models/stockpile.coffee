class Stockpile
  constructor: (@x,@y) ->
    @piles = []
    @persons = []
    @nearest = null
  check_assign: () ->
    if @persons.length == 0
      return false
    return true
  create_drop: (map) ->
    locations = map.free_locations(@x,@y)
    console.log(locations)