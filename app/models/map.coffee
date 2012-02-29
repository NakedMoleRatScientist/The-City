class Map
  constructor: (@width, @height) ->
    @camera_x = 0
    @camera_y = 0
    @map = []
    this.size_map()
    @stockpoints = []
    @crystals = []
    @trees = []
    @sketch = new MapSketch(this)
    @generate = new GenerateMap(this)
    @redraw = []
  size_map: () ->
    for y in [0..@height - 1]
      @map.push(new Array(@width))
      for x in [0..@width - 1]
        @map[y][x] = []

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
  inbound: (x,y) ->
    if y < 0 || y > @width - 1 || x < 0 || x > @height - 1
      return false
    true
  collide_check: (x,y) ->
    if this.inbound(x,y) == false
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
      if this.inbound(x,y) == true
        if @map[y][x].length == 0 || this.collide_check(x,y) == false
          locations.push((x: x,y: y))
      x += 1
    return locations
  acquire: (x,y) ->
    this.select_by_name("crystal",x,y).acquire()
  select_last: (x,y) ->
    unless @map[y][x].length == 0
      l = @map[y][x].length - 1
      @map[y][x][l]