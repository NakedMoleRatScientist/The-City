class mapDraw
  constructor: (@p5,@width, @height) ->

  draw: (map) ->
    results = map.map
    @p5.stroke(255)
    for height in [0..@height] when height < @height
      for width in [0..@width] when width < @width
        object = result[height][width]
        if object == null
          @p5.noFill()
        else
          switch (object.type)
            when 0
              @p5.fill()
        @p5.rect(20 * (width + map.camera_x),20 * (height + map.camera_y),20,20)
