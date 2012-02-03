class Stockpile
  constructor: (@x,@y) ->
    @piles = []
    @persons = []
  check_assign: () ->
    if @persons.length == 0
      return false
    return true
  create_drop: (map) ->
    x = @x - random_number(5) + random_number(5)
    y = @y - random_number(5) + random_number(5)
    proposal = map.propose_drop(x,y)
      if proposal != false
        return proposal