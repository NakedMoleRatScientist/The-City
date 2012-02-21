drawDirtyRects = (dirty,map,p5) ->
  delay = []
  for d in dirty
    location = map.map[d.y][d.x]
    coord = translateIntoDrawCoord(d,map)
    if location != null
      result = determineRectDraw(location,coord.x,coord.y,p5)
      if result != true
        delay.push(result)
    else
      p5.noStroke()
      p5.fill(0)
      p5.rect(coord.x,coord.y,20,20)
  for d in delay
    crystal_stockpile_draw(p5,d.x,d.y)
