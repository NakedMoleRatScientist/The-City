distance_between_two_points = (one,two) ->
  substract_x = (one.x - two.x)
  substract_y = (one.y - two.y)
  square_x = substract_x * substract_x
  square_y = substract_y * substract_y
  Math.sqrt(square_x + square_y)