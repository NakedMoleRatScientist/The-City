class mapDraw
  constructor: (@p5) ->
    @drawable = false
  draw: (map) ->
    if @drawable == false
      output_map(map)
      @drawable = true
  output_map: (map) ->
    results = map.map
    end_y = map.camera_y + 30
    end_x = map.camera_x + 40
    for height in [map.camera_y..end_y]
      for width in [map.camera_x..end_x]
        x = 20 * (width - map.camera_x)
        y = 20 * (height - map.camera_y)
        object = results[height][width]
        @mg.stroke(255,255,255)
        if object != null
          switch (object.name)
            when "floor"
              floor_draw(@mg,x,y)
            when "crystal_tree" #Crystal tree
              crystal_tree_draw(@mg,x,y)
            when "crystal_stockpile" #Crystal stockpile
              crystal_stockpile_draw(@mg,x,y)
            when "crystal"
              crystal_draw(@mg,x,y,object.items)
