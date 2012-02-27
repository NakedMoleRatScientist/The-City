class Pathfinder
  constructor: (@map) ->
  calculate_adjacent: (location,goal) ->
    results = []
    for x  in [(location.x - 1)..(location.x + 1)]
      for y in [(location.y - 1)..(location.y + 1)]
        if !(x == location.x && y == location.y)
          if !@map.collide_check(x,y) #check if point is suitable
            now = (x: x, y: y, parent: null, g: 0, f: 0, h: 0 )
            results.push(now)
    results
  select_least_cost: (locations) ->
    i = 0
    select = 0
    for l in locations
      if l.f < locations[select].f
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
    start.f = start.g + start.h
    close = []
    open = [start]
    while open.length > 0
      location = this.select_least_cost(open)
      current = open[location]

      if current.x == goal.x && current.y == goal.y
        now = current
        results = []
        while (now.parent)
          results.push(now)
          now = now.parent
        console.log(results)
        return results
      open.splice(location,1) #Remove current from open set
      close.push(current) #Push them to close
      for neighbor in this.calculate_adjacent(current,goal)
        if this.part_of(neighbor,close) != false
          if neighbor.x == 15 && neighbor.y == 10
            console.log("DEEP")

          continue
        g_score = current.g + distance_between_two_points(current,neighbor)
        best_g_score = false

        if this.part_of(neighbor,open) == false
          neighbor.h = distance_between_two_points(neighbor,goal)
          open.push(neighbor)
          best_g_score = true
        else if g_score < neighbor.g
          best_g_score = true


        if best_g_score == true
          neighbor.parent = current
          neighbor.g = g_score
          neighbor.f = neighbor.g + neighbor.h
    false