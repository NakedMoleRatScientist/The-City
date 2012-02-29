mapDraw = (map,p5) ->
    p5.background(0)
    results = map.map
    #0 to 30 would be 31 numbers in all since we're starting with 0. This also have implication for end_x as well.
    end_y = map.camera.y + 30 - 1
    end_x = map.camera.x + 40 - 1
    delay = []
    for height in [map.camera.y..end_y]
      for width in [map.camera.x..end_x]
        x = 20 * (width - map.camera.x)
        y = 20 * (height - map.camera.y)
        objects = results[height][width]
        p5.noStroke()
        if objects.length != 0
          for item in objects
            result = determineRectDraw(item,x,y,p5)
            if result != true
              delay.push(result)
    for d in delay
      crystal_stockpile_draw(p5,d.x,d.y)
