class Pathfinder
  constructor: (@map) ->
  calculate_adjacent: (location) ->
    results = []
    for x  in [(location.x - 1)..(location.x + 1)]
      for y in [(location.y - 1)..(location.y + 1)]
        if !(x == location.x && y == location.y)
          if !@map.collide_check(x,y) #check if point is suitable
            now = (x: x, y: y)
            results.push(x: x, y: y)
    results
  claculate_cost: (now,final) ->
    #h is a heuristic that determines how far a given square is to its final destination
    h = distance_between_two_points(goal,now) * 10
    #g determines cost of moving to the location
    if (x == location.x || y == location.y)
      g = 10
    else
      g = 14
    #f determines the cost of movement
    f = g + h

  select_least_cost: (locations) ->
    i = 0
    select = 0
    for l in locations
      if l.cost < locations[select]
        select = i
      i += 1
    select
  part_of: (item,list) ->
    for l in list ->
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
        this.reconstruct_path(came_from, came_from[goal])
      open.splice(location,1)
      close.push(current)
      for neighbor in this.calculate_adjacent(current)
        if this.part_of(neighbor,close) == true
          continue
        tentative_g_score = current.g_score + distance_between_two_points(current,neighbor) * 10
        if this.part_of(neighbor,open) == false
          open.push(neighbor)
