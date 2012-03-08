class Collision
  constructor: (@map) ->
    @collide = []
  forbid: (rect) ->
    @collide.push(rect)
  inbound: (x,y) ->
    if y < 0 || y > @map.width - 1 || x < 0 || x > @map.height - 1
      return false
    true
  check_compatibility: (item,map) ->
    for m in map
      if m.name == "wall"
        return false
    if item.name == "crystal"
      return true
    else if item.name == "wood"
      return true
    false
  collide_check: (individual) ->
    return true if rect_to_many_rect_collision(individual,@collide) == true
    false
