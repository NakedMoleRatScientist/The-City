class Pathfinder
  constructor: (@map) ->
  positions: (x,y,goal) ->
    compare = (x: goal.x, y: goal.y)
    lowest = distance_between_two_points((x: x, y: y),compare)
    which = null
    for hor  in [(x - 1)..(x + 1)]
      for ver in [(y - 1)..(y + 1)]
        if !(hor == x && ver == y)
          if !@map.collide_check(hor,ver) #check if point is suitable
            now = (x: hor, y: ver)
            calculation = distance_beteen_two_points(compare,now)
            if calculation < lowest
              lowest = calculation
              which = now
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