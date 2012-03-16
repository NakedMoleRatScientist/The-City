pointToRectCollision = (compare,against) ->
  width = against.x + against.width
  height = against.y + against.height
  x = compare.x >= against.x && compare.x <= width
  y = compare.y >= against.y && compare.y <= height
  if (x && y)
    return true
  false
