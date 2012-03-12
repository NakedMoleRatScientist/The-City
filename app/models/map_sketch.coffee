class MapSketch
  constructor: (@map) ->
    @finder = new Pathfinder(@map)
    @last = null
  create: (name,x,y,list = true) ->
    object = eval("new " + name.capitalize() + "(x,y)")
    if this.push_to_map(object.x,object.y,object) == true
      if list == true
        result = eval("this.map." + name + "s")
        result.push(object)
      return true
    false
  create_crystal: (x,y) ->
    crystal = new Crystal(x,y)
    crystal.stack = @map.map[y][x].length
    if this.push_to_map(x,y,crystal) == true
      @map.crystals.push(crystal)
    return crystal
  push_to_map: (x,y,item) ->
    if @map.collision.create_check(x,y,item) == true
      @map.map[y][x].push(item)
      return true
    false
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
        this.create("wall",location.x,location.y,false)
      when "crystal"
        this.create("crystal",location.x,location.y)
      when "floor"
        this.create("floor",location.x,location.y,false)
        if thicken == true
          this.create("floor",location.x - 1,location.y,false)
          this.create("floor",location.x,location.y - 1,false)
  draw: (point_a,point_b,type,thicken) ->
    results = this.pathing(point_a,point_b)
    for location in results
      this.draw_location(location,type,thicken)
    @last = null
  delete: (x,y,type) ->
    n = 0
    for m in @map.map[y][x]
      if m.name == type
        break
      n += 1
    @map.map[y][x].splice(n,1)
  delete_type: (x,y,type) ->
    n = 0
    for m in @map.decide_list(type)
      if m.x == x && m.y == y
        break
      n += 1
    @map.decide_list(type).splice(n,1)
  cut_down: (x,y,d) ->
    tree = @map.select_by_name("tree",x,y)
    if tree == false
      object = @map.select_by_name("log",x,y)
    else
      object = tree
    this.delete(x,y,object.name)
    this.delete_type(x,y,object.name)
    if object.name == "log"
      this.create("timber",x,y)
      @map.new_object(x,y)
    if object.name == "tree"
      x += d.x
      y += d.y
      for i in [0..4]
        if this.create("log",x,y) == true
          @map.new_object(x,y)
        x += d.x
        y += d.y
