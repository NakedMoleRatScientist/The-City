class Collision
  constructor: (@map) ->
    @collide = []
  forbid: (rect) ->
    @collide.push(rect)
  inbound: (x,y) ->
    if y < 0 || y > @map.width - 1 || x < 0 || x > @map.height - 1
      return false
    true
  check_compatibility: (item,x,y) ->
    for m in @map.map[y][x]
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
  check_occupancy: (x,y) ->
    for m in @map[y][x]
      return true if m.collide() == true
    false
  check_length: (x,y) ->
    if @map.map[y][x].length == 0
      return true
    false
  create_check: (x,y,item) ->
    this.inbound(x,y) && (this.check_compatibility(item,x,y) || this.check_length(x,y))
  propose_drop: (x,y) ->
    if this.check_length(x,y) || (this.inbound(x,y) && !this.check_occupancy(x,y))
      return true
    false
