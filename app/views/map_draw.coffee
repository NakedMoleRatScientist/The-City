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
        if object == null
          @p5.noFill()
        else
          switch (object.type)
            when "floor"
              @p5.fill()
            when "crystal_tree" #Crystal tree
              @p5.fill(0,0,255)
            when "crystal_stockpile" #Crystal stockpile
              @p5.noFill()
              @p5.stroke(135,206,255)
              @p5.ellipse(x,y,2,2)
              @p5.fill(135,206,255)

        @p5.rect(x,y,20,20)