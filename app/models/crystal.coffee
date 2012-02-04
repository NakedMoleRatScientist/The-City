class Crystal
  constructor: (@x,@y) ->
    @items = 0
    @name = "crystal"
  collide: () ->
    true
  fullness: () ->
    if @items < 50
      return false
    return true
  increase: () ->
    if this.fullness() == false
      @items += 5
      return true
    return false