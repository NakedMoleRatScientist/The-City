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
      @sketch.draw(locations[i],locations[i + 1],"floor",true)
  generate_buildings: () ->
    size = random_number(3) + 1
    begin = (x: 3, y: 3)
    end = (x: begin.x + size, y: begin.y + size )
    @sketch.rect_draw(begin,end,"floor")
    wall_a = (x: begin.x - 1, y: begin.y - 1)
    wall_b = (x: begin.x - 1, y: end.y + 1)
    #draw right side
    @sketch.draw(wall_a,wall_b,"wall")
    wall_a = (x: end.x + 1, y: begin.y - 1)
    wall_b = (x: end.x + 1, y: end.y + 1)
    #draw left side
    @sketch.draw(wall_a,wall_b,"wall")
    wall_a = (x: begin.x, y: begin.y - 1)
    wall_b = (x: end.x, y: begin.y - 1)
    #draw top side
    @sketch.draw(wall_a,wall_b,"wall")
    wall_a = (x: begin.x, y: end.y + 1)
    wall_b = (x: end.x, y: end.y + 1)
    #draw the bottom
    @sketch.draw(wall_a,wall_b,"wall")
  generate: () ->
    this.generate_trees()
    this.generate_buildings()
    this.generate_paths()
