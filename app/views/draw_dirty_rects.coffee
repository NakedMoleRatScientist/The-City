drawDirtyRects = (dirty,map,p5) ->
  for d in dirty
    location = map.map[d.y][d.x]
    x = (d.x - map.camera_x) * 20
    y = (d.y - map.camera_y) * 20
    if location != null
      determineRectDraw(location,x,y,p5)
    else
      p5.noStroke()
      p5.fill(0)
      p5.rect(x,y,20,20)
