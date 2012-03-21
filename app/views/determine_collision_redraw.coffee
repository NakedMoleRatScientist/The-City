determineCollisionRedraw = (p5,dirty,map) ->
  for d in dirty
    coord = translateIntoDrawCoord(d,map)
    for s in map.stockpoints
      location = translateIntoDrawCoord(s,map)
      rect = (x: location.x - 40, y: location.y - 40, width: 100, height: 100)
      if pointToRectCollision(coord,rect) == true
        switch(s.name)
          when"crystal_stockpile"
            crystalStockpileDraw(p5,location.x,location.y)
          when "timber_stockpile"
            timberStockpileDraw(p5,location.x,location.y)
