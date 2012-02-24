class Pathfinder
  constructor: (@map) ->
  calculate_adjcent: (location,goal) ->
    results = []
    for x  in [(location.x - 1)..(location.x + 1)]
      for y in [(location.y - 1)..(location.y + 1)]
        if !(x == location.x && y == location.y)
          if !@map.collide_check(x,y) #check if point is suitable
            now = (x: x, y: y)
           #h is a heuristic that determines how far a given square is to its final destination
            h = distance_between_two_points(goal,now) * 10
            #g determines cost of moving to the location
            if (x == location.x || y == location.y)
              g = 10
            else
              g = 14
            #f determines the cost of movement
            f = g + h
            results.push(x: x, y: y, cost: f)
    results
  select_least_cost: (locations) ->
    i = 0
    select = 0
    for l in locations
      if l.cost < locations[select]
        select = i
      i += 1
    select
  calculate_path: (location,goal) ->
    close = []
    open = this.calculate_adjcent(location,goal)
    close.push(this.select_least_cost(open))