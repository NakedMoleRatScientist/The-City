class Pathfinder
  constructor: (@map) ->
  nearest_position: (location,goal) ->
    compare = (x: goal.x, y: goal.y)
    lowest = distance_between_two_points((x: location.x, y: location.y),compare)
    which = null
    for x  in [(location.x - 1)..(location.x + 1)]
      for y in [(location.y - 1)..(location.y + 1)]
        if !(x == location.x && y == location.y)
          if !@map.collide_check(x,y) #check if point is suitable
            now = (x: x, y: y)
            calculation = distance_beteen_two_points(compare,now)
            if calculation < lowest
              lowest = calculation
              which = now
    if lowest == 0
      return -1
    which
  decide: (x,y,goal) ->
    result = (x: x, y: y)
    positions = []
    loop
      result = nearest_position(result,goal)
      if result == -1
        break
      positions.push(result)
    positions