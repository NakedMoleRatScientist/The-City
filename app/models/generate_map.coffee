class GenerateMap
  constructor: (@map) ->
    @sketch = @map.sketch
  generate_trees: () ->
    for i in [0..9]
      x = random_number(@map.width)
      y = random_number(@map.height)
      @sketch.create_tree(x,y)
  generate_paths: () ->
    locations = []
    for m in @map.trees
      free = @map.free_locations(m.x,m.y,1)
      locations.push(free[random_number(free.length)])
    for i in [0..locations.length - 2]
      @sketch.thicken = true
      @sketch.draw(locations[i],locations[i + 1],"floor")
  generate: () ->
    this.generate_trees()
    this.generate_paths()
    begin = (x: 10, y: 10)
    end = (x: 20,y: 20)
    @sketch.thicken = false
    @sketch.rect_draw(begin,end,"floor")
