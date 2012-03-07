class Map
  constructor: (@width, @height) ->
    this.setup()
  setup: () ->
    @map = []
    this.size_map()
    @stockpoints = []
    @crystals = []
    @crystal_trees = []
    @trees = []
    @collision = new Collision(this)
    @sketch = new MapSketch(this)
    @generate = new GenerateMap(this)
    @camera = new Camera()
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
  rect_inbound: (rect) ->
    return false if !this.inbound(rect.x,rect.y)
    return false if !this.inbound(rect.x + rect.width,rect.y)
    return false if !this.inbound(rect.x,rect.y + rect.y + rect.height)
    true
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

  stockpoints_collision_detect: (newpoint) ->
    return false if @stockpoints.length == 0
    for point in @stockpoints
      if circle_to_circle_collision(newpoint,point) == true #It's not actually a circle anymore
        return true
    return false
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
        if this.propose_drop(x,y) != false
          locations.push((x: x,y: y))
      x += 1
    return locations
  acquire: (x,y) ->
    this.select_by_name("crystal",x,y).acquire()
  select_last: (x,y) ->
    unless @map[y][x].length == 0
      l = @map[y][x].length - 1
      return @map[y][x][l]
    false
  reset: () ->
    this.setup()