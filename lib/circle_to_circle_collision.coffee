circle_to_circle_collision = (one, two) ->
  substract_x = (one.x - two.x)
  substract_y = (one.y - two.y)
  square_x = substract_x * substract_x
  square_y = substract_y * substract_y
  distance = Math.sqrt(square_x + square_y)
  one_radius = one.diameter / 2
  two_radius = two.diameter / 2
  combined_radii = one_radius + two_radius
  if distance < combined_radii
    return true
  return false