class Pathfinder
  constructor: (@map) ->
  positions: (x,y,goal) ->
    compare = (x: x, y: y)
    lowest = 1000
    which = null
    for hor  in [(x - 1)..(x + 1)]
      for ver in [(y - 1)..(y + 1)]
        if !(hor == x && ver == y)
          if !@map.collide_check(hor,ver)
            now = (x: hor, y: ver)
            calculation = distance_beteen_two_points(compare,now)
            if calculation < lowest
              lowest = calculation
              which = now