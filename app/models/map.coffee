class Map
  constructor: (width, height) ->
    @camera_x = 0
    @camera_y = 0
    @map = new Array(height)
    for h in [0..height] when h < height
      @map[h] = new Array(width)
  generate: ->
    for h in [0..@map.length] when h < @map.length
      for w in [0..@map[h].length] when w < @map[h].length
        if (Math.random() * 10) > 5
          @map[h][w] = new Floor()
        else
          @map[h][w] = null
    for i in [0..10] when i < 10
      x = Math.floor(Math.random() * 100)
      y = Math.floor(Math.random() * 100)
      @map[x][y] = new CrystalTree()
  result: ->
    return @map
  add_stockpile:() ->
    x = Math.floor(@mouse.x / 20)
    y = Math.floor(@mouse.y / 20)
    x += @camera_x
    y += @camera_y
    if @map[x][y].collide() == true
      return false
    else
      @map[x][y] = new CrystalPile()

  move_camera: (x,y) ->
    @camera_x += x
    @camera_y += y