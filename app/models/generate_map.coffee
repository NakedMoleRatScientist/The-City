class GenerateMap
  constructor: (@map) ->
    @pathfinder = new Pathfinder(@map) ->
  generate_trees: () ->
    for i in [0..9]
      x = random_number(@width)
      y = random_number(@height)
      tree = new CrystalTree(x,y)
      @map.map[y][x].push(tree)
      @trees.push(tree)
