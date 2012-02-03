class Crystal
  constructor: (@x,@y) ->
    @items = 0
    @name = "crystal"
  collide: () ->
    true