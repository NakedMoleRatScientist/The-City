class mapDraw
  constructor: (@p5) ->
    @drawable = false
    @dirty_rect = []
  draw: (objects,map) ->
    if @drawable == false
      @p5.background(0)
      this.output_map(map)
      @drawable = true
      return
    for o in objects
      @dirty_rect = [] if @direct_rect.length == 0
      x = (o.x - map.camera_x) * 20
      y = (o.y - map.camera_y) * 20
      location = map.map[o.y][o.x]
        @dirty_rect.push(location)
  determine_draw: (location,x,y) ->
    switch(location.name)
      when "floor"
        floor_draw(@p5,x,y)
      when "crystal_tree" #Crystal tree
        crystal_tree_draw(@p5,x,y)
      when "crystal_stockpile" #Crystal stockpile
        crystal_stockpile_draw(@p5,x,y)
      when "crystal"
        crystal_draw(@p5,x,y,object.items)

  output_map: (map) ->
    results = map.map
    end_y = map.camera_y + 30
    end_x = map.camera_x + 40
    for height in [map.camera_y..end_y]
      for width in [map.camera_x..end_x]
        x = 20 * (width - map.camera_x)
        y = 20 * (height - map.camera_y)
        object = results[height][width]
        @p5.stroke(255,255,255)
        if object != null
          this.determine_draw(object,x,y)
