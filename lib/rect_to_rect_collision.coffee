rect_to_rect_collision = (one,two) ->
  one_x = one.x
  one_x2 = two.x + one.width

  one_y = one.y
  one_y2 = one.y + one.height

  two_x = two.x
  two_x2 = two.x + two.width

  two_y = two.y
  two_y2 = two.y + two.height
  #buggy collision detection. need some testing.
  return true if one_x >= two_x && one_y2 >= two_y
  false