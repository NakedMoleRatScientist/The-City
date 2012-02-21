determineCollisionRedraw = (p5,dirty,map) ->
  for d in dirty
    coord = translateIntoDrawCoord(d,map)
    if pointToRectCollision(coord,(x: 700, y: 100, width: 100, height: 400)) == true
      menuDraw(object.menu,p5)
    for s in stockpoints
      location = translateIntoDrawCoord(s,map)
      rect = (x: location.x - 40, y: location.y - 40, width: 100, height: 100)
      if pointToRectCollision(coord,rect)
        crystal_stockpile_draw(p5,location.x,location.y)
