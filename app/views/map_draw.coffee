mapDraw = (map,p5) ->
    p5.background(0)
    results = map.map
    end_y = map.camera_y + 30
    end_x = map.camera_x + 40
    for height in [map.camera_y..end_y]
      for width in [map.camera_x..end_x]
        x = 20 * (width - map.camera_x)
        y = 20 * (height - map.camera_y)
        object = results[height][width]
        p5.stroke(255,255,255)
        if object != null
          determine_rect_draw(object,x,y,p5)
