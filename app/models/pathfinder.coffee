class Pathfinder
  constructor: (@map) ->
  calculate_adjacent: (location,goal) ->
    results = []
    for x  in [(location.x - 1)..(location.x + 1)]
      for y in [(location.y - 1)..(location.y + 1)]
        if !(x == location.x && y == location.y)
          if !@map.collide_check(x,y) #check if point is suitable
            now = (x: x, y: y)
            calculation = this.calculate_cost(now,location,goal)
            now.g = calculation.g
            now.h = calculation.h
            now.cost = calculation.cost
            results.push(now)
    results
  calculate_cost: (now,location,goal) ->
    #h is a heuristic that determines how far a given square is to its final destination
    h = distance_between_two_points(goal,now) * 10
    #g determines cost of moving to the location
    if (now.x == location.x || now.y == location.y)
      g = 10
    else
      g = 14
    #f determines the cost of movement
    f = g + h
    return (g: g, h: h, cost: f)

  select_least_cost: (locations) ->
    i = 0
    select = 0
    for l in locations
      if l.cost < locations[select]
        select = i
      i += 1
    select
  part_of: (item,list) ->
    for l in list
      if item.x == l.x && item.y == l.y
        return true
    false
  calculate_path: (start,goal) ->
    start.g = 0
    start.h = distance_between_two_points(start,goal) * 10
    start.cost = start.g + start.h
    close = []
    open = [start]
    came_from = []
    while open.length != 0
      location = this.select_least_cost(open)
      current = open[location]
      if current.x == goal.x && current.y == goal.y
        return came_from
      open.splice(location,1)
      close.push(current)
      for neighbor in this.calculate_adjacent(current,goal)
        if this.part_of(neighbor,close) == true
          continue
        tentative_g_score = current.g_score + distance_between_two_points(current,neighbor) * 10
        if this.part_of(neighbor,open) == false
          open.push(neighbor)
        else if tentative_g_score < neighbor.g
          came_from[neighbor] = current
          neighbor.g = tentative_g_score
          neighbor.cost = neighbor.g + neighbor.h
    false
  reconstruct_path: (came_from,current) ->
    if came_from[current] != null
      p = this.reconstruct_path(came_from,came_from[current])
      return (p + current)
    else
      return current
