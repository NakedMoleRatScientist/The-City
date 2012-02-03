class mapDraw
  constructor: (@p5,@width, @height) ->

  draw: (map) ->
    results = map.map
    @p5.stroke(255)
    for height in [0..@height] when height < @height
      for width in [0..@width] when width < @width
        x = 20 * (width + map.camera_x)
        y = 20 * (height + map.camera_y)
        object = results[height][width]
        @p5.stroke(255,255,255)
        if object == null
          @p5.noFill()
        else
          switch (object.name)
            when "floor"
              floor_draw(@p5,x,y)
            when "crystal_tree" #Crystal tree
              crystal_tree_draw(@p5,x,y)
            when "crystal_stockpile" #Crystal stockpile
              crystal_stockpile_draw(@p5,x,y)
            when "crystal"
              @p5.fill(0,0,255)
              @p5.triangle(x,y + 20,x + 10, y, x + 20, y + 20)
