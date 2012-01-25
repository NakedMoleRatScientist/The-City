class CrystalPile extends Stockpile
  constructor: (@x,@y) ->
    super()
    @name = "CrystalPile"
    @persons = []
    @priority = 4
  collide: () ->
    return true
  diameter: () ->
    return 5
  check_assign: () ->
    if @persons.length == 0
      return false
    return true