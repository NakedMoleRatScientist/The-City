rectToRectCollision = (rect_one,rect_two) ->
  left_one = rect_one.x
  right_one = rect_one.x + rect_one.width
  left_two = rect_two.x
  right_two = rect_two.x + rect_two.width
  top_one = rect_one.y
  bottom_one = rect_one.y + rect_one.height
  top_two = rect_two.y
  bottom_two = rect_two.y + rect_two.height
  !(if right_one < left_one || left_one > right_one || top_one > botton_two || bottom_two > top_one)
