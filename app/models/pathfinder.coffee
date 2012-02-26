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
    h = distance_between_two_points(goal,now)
    #g determines cost of moving to the location
    g = location.g + distance_between_two_points(location,now)
    #f determines the cost of movement
    f = g + h
    return (g: g, h: h, cost: f)

  select_least_cost: (locations) ->
    i = 0
    select = 0
    for l in locations
      if l.cost < locations[select].cost
        select = i
      i += 1
    select
  part_of: (item,list) ->
    i = 0
    for l in list
      if item.x == l.x && item.y == l.y
        return i
      i += 1
    false
  calculate_path: (start,goal) ->
    start.g = 0
    start.h = distance_between_two_points(start,goal)
    start.cost = start.g + start.h
    close = []
    open = [start]
    came_from = []
    while open.length != 0
      location = this.select_least_cost(open)
      current = open[location]
      if current.x == goal.x && current.y == goal.y
        came_from.push(current)
        return came_from
      open.splice(location,1) #Remove current from open set
      close.push(current) #Push them to close
      for neighbor in this.calculate_adjacent(current,goal)
        if this.part_of(neighbor,close) != false
          continue
        if this.part_of(neighbor,open) == false
          open.push(neighbor)
        else if current.g < neighbor.g
          came_from.push(current)
    false