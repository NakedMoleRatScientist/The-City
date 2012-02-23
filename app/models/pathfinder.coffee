class Pathfinder
  constructor: (@map) ->
  nearest_position: (location,goal) ->
    compare = (x: goal.x, y: goal.y)
    lowest = distance_between_two_points((x: x, y: y),compare)
    which = null
    for hor  in [(location.x - 1)..(location.x + 1)]
      for ver in [(location.y - 1)..(location.y + 1)]
        if !(hor == location.x && ver == location.y)
          if !@map.collide_check(hor,ver) #check if point is suitable
            now = (x: hor, y: ver)
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