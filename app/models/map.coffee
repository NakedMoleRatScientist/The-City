class Map
  constructor: (@width, @height) ->
    @camera_x = 0
    @camera_y = 0
    @map = new Array(height)
    this.size_map()
    @stockpoints = []
    @crystals = []
    @trees = []
    @sketch = new MapSketch(this)
    @redraw = []
  size_map: () ->
    for h in [0..@height] when h < @height
      @map[h] = new Array(@width)

  generate: ->
    for h in [0..@map.length] when h < @map.length
      for w in [0..@map[h].length] when w < @map[h].length
        if (Math.random() * 10) > 5
          @map[h][w] = [new Floor(w,h)]
        else
          @map[h][w] = []
    for i in [0..10] when i < 10
      x = Math.floor(Math.random() * @width)
      y = Math.floor(Math.random() * @height)
      tree = new CrystalTree(x,y)
      @map[y][x].push(tree)
      @trees.push(tree)


  items_total: () ->
    items = 0
    for c in @crystals
     items += @map[c.y][c.x][c.stack].items
    items
  drop_crystal: (x,y) ->
    for m in @map[y][x]
      if m.name == "crystal"
        @redraw.push(x: x, y: y)
        if m.increase() == false
          return false
        return true

  collide_check: (x,y) ->
    if y < 0 || y > @width - 1 || x < 0 || x > @height - 1
      return true
    for m in @map[y][x]
      return true if m.collide() == true
    false

  add_stockpile:(mouse) ->
    x = mouse.x
    y = mouse.y
    x = Math.floor(x / 20) + @camera_x
    y = Math.floor(y / 20) + @camera_y
    return if x < 2 || x > 97
    return if y < 2 || y > 97
    newpoint = new CrystalStock(x,y)
    collide = false
    if this.stockpoints_collision_detect(newpoint) == true || this.collide_check(x,y) == true
      collide = true
    if collide == false
      @map[y][x].push(newpoint)
      newpoint.nearest = nearest_object(newpoint,@trees)
      @stockpoints.push(newpoint)

  stockpoints_collision_detect: (newpoint) ->
    return false if @stockpoints.length == 0
    for point in @stockpoints
      if circle_to_circle_collision(newpoint,point) == true #It's not actually a circle anymore
        return true
    return false
  move_camera: (x,y) ->
    @camera_x += x
    if @camera_x < 0 || @camera_x > 60
      @camera_x -= x
    @camera_y += y
    if @camera_y < 0 || @camera_y > 70
      @camera_y -= y
  select_by_name: (name,x,y) ->
    for m in @map[y][x]
      if m.name == name
        return m
    false
  propose_drop: (x,y) ->
    if @map[y][x].length == 0 || this.collide_check(x,y) == false
      return (x: x, y: y)
    else if this.collide_check(x,y) == true && this.select_by_name("crystal_stockpile",x,y) == true
      return (x: x, y: y)
    return false
  free_locations: (x,y,size) ->
    end_x = x + size
    begin_x = x - size
    end_y = y + size
    x = begin_x
    y -= size
    locations = []
    loop
      if x > end_x
        x = begin_x
        y += 1
        if y > end_y
          break
      if @map[y][x].length == 0 || this.collide_check(x,y) == false
        locations.push((x: x,y: y))
      x += 1
    return locations
  acquire: (x,y) ->
    this.select_by_name("crystal",x,y).acquire()
