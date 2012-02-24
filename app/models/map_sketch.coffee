class MapSketch
  constructor: (@map) ->
  create_wall: (x, y) ->
    @map[y][x].push(new Wall(x,y))
  draw: (point_a,point_b) ->
