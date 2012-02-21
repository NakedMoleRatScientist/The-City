determineCollisionRedraw = (dirty,map) ->
  for d in dirty
    if map[d.y][d.x] != null
      if map[d.y][d.x].name == "crystal"
        coord = translateIntoDrawCoord(d,map)
        if rectToRectCollision(coord,(x: 700, y: 100, width: 100, height: 400)) == true
          return true
  false
