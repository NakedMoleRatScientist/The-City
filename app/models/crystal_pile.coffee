class CrystalPile extends Stockpile
  constructor: () ->
    super()
    @name = "CrystalPile"
  collide: () ->
    return true
  radius: () ->
    return 2