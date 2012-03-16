class Item
  constructor: (@x,@y) ->
    @items = 1
    @background = null
    @stack = 0
  collide: () ->
    true
  fullness: () ->
    if @items < @limit
      return false
    true
  increase: () ->
    if this.fullness() == false
      @items += 1
      return true
    false
  acquire: () ->
    @items -= 1
    return @name