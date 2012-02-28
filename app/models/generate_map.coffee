class GenerateMap
  constructor: (@map) ->
    @sketch = @map.sketch
  generate_trees: () ->
    for i in [0..9]
      x = random_number(@width)
      y = random_number(@height)
      @sketch.create_tree(x,y)