class MapSketch
  constructor: (@map) ->

  create_wall: (x, y) ->
    @map.map[y][x].push(new Wall(x,y))

  create_crystal: (x,y) ->
    crystal = new Crystal(x,y)
    crystal.stack = @map.map[y][x].length
    @map.crystals.push(crystal)
    @map.map[y][x].push(crystal)
    return crystal

  draw: (point_a,point_b) ->
