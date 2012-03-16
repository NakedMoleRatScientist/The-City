pointToRectCollision = (compare,rect_two) ->
  x = compare.x >= rect_two.x && compare.x <= rect_two.x + rect_two.width
  y = compare.y >= rect_two.y && compare.y <= rect_two.y + rect_two.height
  if (x && y)
    return true
  false
