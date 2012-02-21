determineCollisionRedraw = (dirty,map) ->
  for d in dirty
    coord = translateIntoDrawCoord(d,map)
    if rectToRectCollision(coord,(x: 700, y: 100, width: 100, height: 400)) == true
      return true
  false
