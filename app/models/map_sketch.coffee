class MapSketch
  constructor: (@map) ->
    @finder = new Pathfinder(@map)
    @last = null
    @paths = []
    @collide = []
  forbid: (rect) ->
    @collide.push(rect)
  create_wall: (x, y) ->
    wall = new Wall(x,y)
    this.push_to_map(x,y,wall)
  create_tree: (x, y) ->
    tree = new Tree(x,y)
    if this.push_to_map(x,y,tree) == true
      @map.trees.push(tree)
      return true
    false
  create_crystal_tree: (x, y, collide = false) ->
    tree = new CrystalTree(x,y)
    if this.push_to_map(x,y,tree) == true
      @map.crystal_trees.push(tree)
      return true
    false
  create_crystal: (x,y) ->
    crystal = new Crystal(x,y)
    crystal.stack = @map.map[y][x].length
    if this.push_to_map(x,y,crystal) == true
      @map.crystals.push(crystal)
    return crystal
  check_compatibility: (item,map) ->
    for m in map
      if m.name == "wall"
        return false
    if item.name == "crystal"
      return true
    false
  push_to_map: (x,y,item) ->
    if @map.inbound(x,y) == true
      if @map.map[y][x].length == 0 || this.check_compatibility(item,@map.map[y][x])
        @map.map[y][x].push(item)
        return true
      false
  create_floor: (x,y) ->
    floor = new Floor(x,y)
    this.push_to_map(x,y,floor)
    floor
  rect_draw: (begin,end,type) ->
    for x in [begin.x..end.x]
      for y in [begin.y..end.y]
        this.draw_location((x: x, y: y),type)
  pathing: (point_a,point_b) ->
    results = @finder.calculate_path(point_a,point_b)
    if results != -1
      results.push(point_a) #since starting positions aren't pushed in pathfinder
    results
  draw_location: (location,type,thicken = false) ->
    switch(type)
      when "wall"
        this.create_wall(location.x,location.y)
      when "crystal"
        this.create_crystal(location.x,location.y)
      when "floor"
        @last = this.create_floor(location.x,location.y)
        if thicken == true
          this.create_floor(@last.x - 1,@last.y)
          this.create_floor(@last.x,@last.y - 1)
  draw: (point_a,point_b,type,thicken) ->
    results = this.pathing(point_a,point_b)
    for location in results
      this.draw_location(location,type,thicken)
    @last = null
  check_collision: (individual) ->
    return true if rect_to_many_rect_collision(individual,@collide) == true
    false
  decide_stock: (mouse,x,y) ->
    switch(mouse.build)
      when "tree"
        return new TreeStock(x,y)
      when "crystal"
        return new CrystalStock(x,y)

  add_stockpile:(mouse) ->
    x = Math.floor(mouse.x / 20) + @map.camera.x
    y = Math.floor(mouse.y / 20) + @map.camera.y
    return if x < 2 || x > 97
    return if y < 2 || y > 97
    newpoint = this.decide_stock(mouse,x,y)
    unless @map.stockpoints_collision_detect(newpoint) == true || @map.collide_check(x,y) == true
      @map.map[y][x].push(newpoint)
      newpoint.nearest = nearest_object(newpoint,@map.crystal_trees)
      @map.stockpoints.push(newpoint)
  delete: (x,y,type) ->
    n = 0
    for m in @map.map[y][x]
      if m.name == type
        break
      n += 1
    @map.map[y][x].splice(n,1)