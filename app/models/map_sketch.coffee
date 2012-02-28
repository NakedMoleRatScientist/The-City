class MapSketch
  constructor: (@map) ->
    @finder = new Pathfinder(@map)
    @thickness = 1
    @last = null
  create_wall: (x, y) ->
    wall = new Wall(x,y)
    this.push_to_map(x,y,wall)
  create_tree: (x, y) ->
    tree = new CrystalTree(x,y)
    if this.push_to_map(x,y,tree) == true
      @map.trees.push(tree)
  create_crystal: (x,y) ->
    crystal = new Crystal(x,y)
    crystal.stack = @map.map[y][x].length
    if this.push_to_map(x,y,crystal) == true
      @map.crystals.push(crystal)
    return crystal
  push_to_map: (x,y,item) ->
    if @map.map[y][x].length == 0 && @map.inbound(x,y) == true
      @map.map[y][x].push(item)
      return true
    false
  create_floor: (x,y) ->
    floor = new Floor(x,y)
    this.push_to_map(x,y,floor)
    x -= 1
    first_floor = new Floor(x,y)
    this.push_to_map(x,y,first_floor)
    x += 1
    y -= 1
    second_floor = new Floor(x,y)
    this.push_to_map(x,y,second_floor)
    @last = floor
  rect_draw: (begin,end,type) ->
    for x in [begin.x..end.x - 1]
      for y in [begin.y..end.y - 1]
        this.draw_location(x,y,type)
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