class mapDraw
  constructor: (@p5,@width, @height) ->

  draw: (map) ->
    results = map.map
    @p5.stroke(255)
    for height in [map.camera_y..@height] when height < @height
      for width in [map.camera_x..@width] when width < @width
        x = 20 * width
        y = 20 * height
        object = results[height][width]
        @p5.stroke(255,255,255)
        if object != null
          switch (object.name)
            when "floor"
              floor_draw(@p5,x,y)
            when "crystal_tree" #Crystal tree
              crystal_tree_draw(@p5,x,y)
            when "crystal_stockpile" #Crystal stockpile
              crystal_stockpile_draw(@p5,x,y)
            when "crystal"
              crystal_draw(@p5,x,y,object.items)
