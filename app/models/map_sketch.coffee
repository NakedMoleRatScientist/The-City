class MapSketch
  constructor: (@map) ->
    @finder = new Pathfinder(@map)
  create_wall: (x, y) ->
    @map.map[y][x].push(new Wall(x,y))
  create_tree: (x, y) ->
    tree = new CrystalTree(x,y)
    @map.map[y][x].push(tree)
    @trees.push(tree)
  create_crystal: (x,y) ->
    crystal = new Crystal(x,y)
    crystal.stack = @map.map[y][x].length
    @map.crystals.push(crystal)
    @map.map[y][x].push(crystal)
    return crystal

  draw: (point_a,point_b,type) ->
    results = @finder.calculate_path(point_a,point_b)
    if results != -1
      results.push(point_a) #since starting positions aren't pushed in pathfinder
      for location in results
        switch(type)
          when "wall"
            this.create_wall(location.x,location.y)
          when "crystal"
            this.create_crystal(location.x,location.y)
