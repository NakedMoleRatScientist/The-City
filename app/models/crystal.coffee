class Crystal
  constructor: (@x,@y) ->
    @items = 0
    @name = "crystal"
    @background = null
    @stack = 0
  collide: () ->
    true
  fullness: () ->
    if @items < 50
      return false
    return true
  increase: () ->
    if this.fullness() == false
      @items += 1
      return true
    return false
  acquire: () ->
    @items -= 1
    return "crystal"
