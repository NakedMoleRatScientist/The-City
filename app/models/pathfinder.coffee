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
  sort_by_least_cost: (a,b) ->
    a.f - b.f
  part_of: (item,list) ->
    i = 0
    for l in list
      if item.x == l.x && item.y == l.y
        return i
      i += 1
    false
  calculate_path: (start,goal) ->
    return false if @map.collide_check(goal.x,goal.y)
    start.g = 0
    start.h = distance_between_two_points(start,goal)
    start.f = start.g + start.h
    close = []
    open = [start]
    start = new Date().getTime()
    while open.length > 0
      open.sort(this.sort_by_least_cost)
      current = open[0]
      if current.x == goal.x && current.y == goal.y
        now = current
        results = []
        while (now.parent)
          results.push(now)
          now = now.parent
        end = new Date().getTime()
        console.log("path calculation time in MS: " + (end - start))
        return results
      open.shift() #Remove current from open set
      close.push(current) #Push them to close
      for neighbor in this.calculate_adjacent(current,goal)
        if this.part_of(neighbor,close) != false
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
    end = new Date().getTime()
    console.log("can't find path. Calculation in MS: " + (end - start))
    false