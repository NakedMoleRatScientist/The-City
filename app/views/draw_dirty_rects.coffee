drawDirtyRects = (dirty,map,p5) ->
  delay = []
  for d in dirty
    location = map.map[d.y][d.x]
    coord = translateIntoDrawCoord(d,map)
    p5.noStroke()
    p5.fill(0)
    p5.rect(coord.x,coord.y,20,20)
    for item in location
      result = determineRectDraw(item,coord.x,coord.y,p5)
      if result != true
        delay.push(result)
  for d in delay
    crystalStockpileDraw(p5,d.x,d.y)
