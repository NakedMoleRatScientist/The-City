class CrystalPile extends Stockpile
  constructor: (@x,@y) ->
    super()
    @name = "CrystalPile"
    @persons = []
  collide: () ->
    return true
  diameter: () ->
    return 5