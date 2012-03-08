class Wood
  constructor: (@x,@y) ->
    @items = 0
    @name = "wood"
    @background = null
    @stack = 0
  collide: () ->
    true
  fullness: () ->
    if @items < 50
      return false
    true
  increase: () ->
    if this.fullness() == false
      @item += 1
      return true
    false
  acquire: () ->
    @items -= 1
    return "wood"