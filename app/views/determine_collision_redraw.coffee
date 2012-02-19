determineCollisionRedraw = (dirty) ->
  for d in dirty
    if rectToRectCollision(@dirty_rects,(x: 700, y: 100, width: 100, height: 400)) == true
      return true
  false