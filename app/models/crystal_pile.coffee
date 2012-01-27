class CrystalPile extends Stockpile
  constructor: (@x,@y) ->
    super()
    @name = "CrystalPile"
    @persons = []
    @priority = 4
    @diameter = 3
    @size = 10
    @queue = false
  collide: () ->
    return true
  check_assign: () ->
    if @persons.length == 0
      return false
    return true
  job: () ->
    "gather_crystals"