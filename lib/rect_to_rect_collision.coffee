rectToRectCollision = (rect_one,rect_two) ->
  x = rect_one.x >= rect_two.x && rect_one.x <= rect_two.x + rect_two.width
  y = rect_one.y >= rect_two.y && rect_one.y <= rect_two.y + rect_two.height
  if (x && y)
    return true
  false