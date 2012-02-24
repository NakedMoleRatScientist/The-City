class MapSketch
  constructor: (@map) ->
    @finder = new Pathfinder(@map)
  create_wall: (x, y) ->
    @map.map[y][x].push(new Wall(x,y))

  create_crystal: (x,y) ->
    crystal = new Crystal(x,y)
    crystal.stack = @map.map[y][x].length
    @map.crystals.push(crystal)
    @map.map[y][x].push(crystal)
    return crystal

  draw: (point_a,point_b,type) ->
    results = @finder.decide(point_a,point_b)
    switch(type)
      when "wall"
        method = this.create_wall
      when "crystal"
        method = this.create_crystal
    if results != -1
      for location in results
        method.call(location.x,location.y)
