class Stockpile
  constructor: () ->
    @piles = []
    @persons = []
  check_assign: () ->
    if @persons.length == 0
      return false
    return true
