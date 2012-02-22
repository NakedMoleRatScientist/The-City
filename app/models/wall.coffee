class Wall
  constructor: (@x, @y) ->
    @name = "wall"
  collide: () ->
    true
