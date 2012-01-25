class CrystalPile extends Stockpile
  constructor: (@x,@y) ->
    super()
    @name = "CrystalPile"
  collide: () ->
    return true
  diameter: () ->
    return 5