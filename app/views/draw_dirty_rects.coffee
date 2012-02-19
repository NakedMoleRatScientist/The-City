drawDirtyRects = (dirty,map,p5) ->
  for d in dirty
    location = map.map[d.y][d.x]
    coord = translateIntoDrawCoord(d,map)
    if location != null
      determineRectDraw(location,coord.x,coord.y,p5)
    else
      p5.noStroke()
      p5.fill(0)
      p5.rect(coord.x,coord.y,20,20)
