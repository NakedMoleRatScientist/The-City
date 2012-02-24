class Pathfinder
  constructor: (@map) ->
  nearest_position: (location,goal) ->
    which = null
    lowest = 1000
    for x  in [(location.x - 1)..(location.x + 1)]
      for y in [(location.y - 1)..(location.y + 1)]
        if !(x == location.x && y == location.y)
          if !@map.collide_check(x,y) #check if point is suitable
            now = (x: x, y: y)
           #h is a heuristic that determine how far a given square is to its next destination.
            h = distance_between_two_points(goal,now) * 10
            #g determine cost of moving to the location
            if (x == location.x || y == location.y)
              g = 10
            else
              g = 14
            if calculation < lowest
              lowest = h
              which = now
    which
  decide: (location,goal) ->
    result = location
    positions = []
    limit = 0
    loop
      if limit == 1000
        console.log("ERROR! CANNOT FIND PATH")
        return -1
      result = this.nearest_position(result,goal)
      positions.push(result)
      limit += 1
      if result.x == goal.x && result.y == goal.y
        break
    positions