class GenerateMap
  constructor: (@map) ->
    @sketch = @map.sketch
  generate_trees: () ->
    locations = []
    for i in [0..9]
      x = random_number(@map.width)
      y = random_number(@map.height)
      @sketch.create_tree(x,y)
      places = @map.free_locations(x,y,1)
      locations.push(places[random_number(places.length)])
    for i in [0..locations.length - 1] when i % 2 == 0
      @sketch.draw(locations[i],locations[i + 1],"floor")