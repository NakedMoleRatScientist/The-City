class CrystalStock extends Stockpile
  constructor: (@x,@y) ->
    super()
    @name = "CrystalStock"
    @priority = 4
    @diameter = 5
    @size = 10
    @queue = false
    @orders = ["crystal_move","crystal_gather","move_to_drop","crystal_drop"]
    @nearest = null
  collide: () ->
    return true
  set_drop: () ->