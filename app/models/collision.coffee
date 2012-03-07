class Collision
  constructor: (@map) ->
  inbound: (x,y) ->
    if y < 0 || y > @width - 1 || x < 0 || x > @height - 1
      return false
    true
