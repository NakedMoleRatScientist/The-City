class MapSketch
  constructor: (@map) ->
    @finder = new Pathfinder(@map)
    @thickness = 1
    @last = null
  create_wall: (x, y) ->
    @map.map[y][x].push(new Wall(x,y))
  create_tree: (x, y) ->
    tree = new CrystalTree(x,y)
    @map.map[y][x].push(tree)
    @map.trees.push(tree)
  create_crystal: (x,y) ->
    crystal = new Crystal(x,y)
    crystal.stack = @map.map[y][x].length
    @map.crystals.push(crystal)
    @map.map[y][x].push(crystal)
    return crystal
  create_floor: (x,y) ->
    floor = new Floor(x,y)
    @map.map[y][x].push(floor)
    unless @last == null
      diff_x = Math.abs(@last.x - floor.x)
      diff_y = Math.abs(@last.y - floor.y)
      if diff_x > 0
        for i in [1..@thickness]
          newfloor = new Floor(x - 1,y)
          @map.map[y][x].push(newfloor)
      else if diff_y > 0
        for i in [1..@thickness]
          newfloor = new Floor(x,y - i)
          @map.map[y][x].push(newfloor)
    @last = floor
  pathing: (point_a,point_b) ->
    results = @finder.calculate_path(point_a,point_b)
    if results != -1
      results.push(point_a) #since starting positions aren't pushed in pathfinder
    results
  draw: (point_a,point_b,type) ->
    results = this.pathing(point_a,point_b)
    for location in results
      switch(type)
        when "wall"
          this.create_wall(location.x,location.y)
        when "crystal"
          this.create_crystal(location.x,location.y)
        when "floor"
          this.create_floor(location.x,location.y)
    @last = null
