class GenerateMap
  constructor: (@map) ->
    @sketch = @map.sketch
    @collide = []
  forbid: (rect) ->
    @collide.push(rect)
  generate_trees: () ->
    success = 0
    loop
      x = random_number(@map.width)
      y = random_number(@map.height)
      if @sketch.create_tree(x,y) == true
        success += 1
      if success == 10
        break
  generate_paths: () ->
    locations = []
    for m in @map.trees
      free = @map.free_locations(m.x,m.y,1)
      locations.push(free[random_number(free.length)])
    for i in [0..locations.length - 2]
      @sketch.draw(locations[i],locations[i + 1],"floor",true)
  create_building: (x,y,size) ->
    rect = new Rect(2,2,size + 1,size + 1)
#    this.forbid(rect)
    begin = (x: x, y: y)
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
  generate_buildings: () ->
  generate: () ->
    this.generate_buildings()
    this.generate_trees()
    this.generate_paths()
