class GenerateMap
  constructor: (@map) ->
    @sketch = @map.sketch
  generate_trees: () ->
    for i in [0..9]
      x = random_number(@map.width)
      y = random_number(@map.height)
      @sketch.create_tree(x,y)