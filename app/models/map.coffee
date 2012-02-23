class Map
  constructor: (width, height) ->
    @camera_x = 0
    @camera_y = 0
    @map = new Array(height)
    for h in [0..height] when h < height
      @map[h] = new Array(width)
    @stockpoints = []
    @crystals = []
    @trees = []
  generate: ->
    for h in [0..@map.length] when h < @map.length
      for w in [0..@map[h].length] when w < @map[h].length
        if (Math.random() * 10) > 5
          @map[h][w] = [new Floor(w,h)]
        else
          @map[h][w] = []
    for i in [0..10] when i < 10
      x = Math.floor(Math.random() * 100)
      y = Math.floor(Math.random() * 100)
      tree = new CrystalTree(x,y)
      @map[y][x].push(tree)
      @trees.push(tree)

  create_wall: (x, y) ->
    @map[y][x] = new Wall()
  create_crystal: (x,y) ->
    @crystals.push (x: x, y: y)
    object = @map[y][x]
    #workaround! NEED to replace someday.
    back = null
    if object != null && object.name == "floor"
      back = "floor"
    object = new Crystal(x,y)
    object.background = back
    @map[y][x] = object

  items_total: () ->
    items = 0
    for c in @crystals
     items += @map[c.y][c.x].items
    items
  drop_crystal: (x,y) ->
    if @map[y][x].increase() == false
      return false
    return true


  add_stockpile:(mouse) ->
    x = mouse.x
    y = mouse.y
    x = Math.floor(x / 20) + @camera_x
    y = Math.floor(y / 20) + @camera_y
    return if x < 2 || x > 97
    return if y < 2 || y > 97
    if @map[y][x] == null || @map[y][x].collide() == false
      newpoint = new CrystalStock(x,y)
      if this.collision_detect(newpoint) == false
        @map[y][x] = newpoint
        newpoint.nearest = nearest_object(newpoint,@trees)
        @stockpoints.push @map[y][x]
  collision_detect: (newpoint) ->
    return false if @stockpoints.length == 0
    for point in @stockpoints
      if circle_to_circle_collision(newpoint,point) == true
        return true
    return false
  move_camera: (x,y) ->
    @camera_x += x
    if @camera_x < 0 || @camera_x > 60
      @camera_x -= x
    @camera_y += y
    if @camera_y < 0 || @camera_y > 70
      @camera_y -= y
  propose_drop: (x,y) ->
    if @map[y][x] == null || @map[y][x].collide() == false
      return (x: x, y: y)
    else if @map[y][x].collide() == true && @map[y][x].name == "crystal_stockpile"
      return (x: x, y: y)
    return false
  free_locations: (x,y) ->
    end_x = x + 2
    begin_x = x - 2
    end_y = y + 2
    x = begin_x
    y -= 2
    locations = []
    loop
      if x > end_x
        x = begin_x
        y += 1
        if y > end_y
          break
      if @map[y][x] == null || @map[y][x].collide() == false
        locations.push((x: x,y: y))
      x += 1
    return locations
  acquire: (x,y) ->
    @map[y][x].acquire()
