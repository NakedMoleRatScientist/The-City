class CrystalPile extends Stockpile
  constructor: (@x,@y) ->
    super()
    @name = "CrystalPile"
  collide: () ->
    return true
  radius: () ->
    return 2