class GenerateMap
  constructor: (@map) ->
    @sketch = @map.sketch
  random_positions: () ->
    (x: random_number(@map.width), y: random_number(@map.height))
  try_ten_until_success: (act) ->
    success = 0
    loop
      r = this.random_positions()
      if act(r,this) == true
        success += 1
      if success == 10
        break
  generate_trees: (r,gen) ->
    gen.create_tree(r.x,r.y)
  generate_crystal_trees: (r,gen) ->
    gen.sketch.create("crystalTree",r.x,r.y)
  range: (x,y) ->
    list = [x..y]
    list.pop()
    list.shift()
    list
  generate_paths: () ->
    locations = []
    for m in @map.crystalTrees
      free = @map.free_locations(m.x,m.y,1)
      locations.push(free[random_number(free.length)])
    for i in [0..locations.length - 2]
      @sketch.draw(locations[i],locations[i + 1],"floor",true)
  create_building: (x,y,size) ->
    rect = new Rect(x,y,size,size)
    if @map.collision.collide_check(rect) == true || @map.rect_inbound(rect) == false || size < 2
      return
    @map.collision.forbid(rect)
    begin = (x: x + 1, y: y + 1)
    end = (x: begin.x + (size - 2), y: begin.y + (size - 2) )
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
    #create entry to the building
    direction = random_number(4)
    switch(direction)
      when 0
        x = begin.x - 1
        choices = this.range(begin.y - 1, end.y + 1)
        y = choices[random_number(choices.length)]
      when 1
        x = end.x + 1
        choices = this.range(begin.y - 1,end.y + 1)
        y = choices[random_number(choices.length)]
      when 2
        y = begin.y - 1
        choices = this.range(begin.x - 1,end.x + 1)
        x = choices[random_number(choices.length)]
      when 3
        y = end.y + 1
        choices = this.range(begin.x - 1,end.x + 1)
        x = choices[random_number(choices.length)]
    @sketch.delete(x,y,"wall")
  create_tree: (x,y) ->
    dir = []
    dir.push (status: @map.collision.collide_range_check(x + 1, x + 5,y,0), dir: "right")
    dir.push (status: @map.collision.collide_range_check(x - 1,x - 5,y,0), dir: "left")
    dir.push (status: @map.collision.collide_range_check(y + 1,y + 5,x,1), dir: "down")
    dir.push (status: @map.collision.collide_range_check(y - 1, y - 5,x,1), dir: "up")
    for d in dir
      if d.status == true
        @sketch.create("tree",x,y)
        @map.select_last(x,y).dir = d.dir
        return true
    false

  generate_buildings: () ->
    for i in [0..15]
      x = random_number(100)
      y = random_number(100)
      size = random_number(5)
      this.create_building(x,y,size)
  generate: () ->
    this.generate_buildings()
    this.try_ten_until_success(this.generate_trees)
    this.try_ten_until_success(this.generate_crystal_trees)
    this.generate_paths()