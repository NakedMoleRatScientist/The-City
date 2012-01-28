circle_to_circle_collision = (one, two) ->
  x = Math.sqrt(one.x - two.x)
  y = Math.sqrt(one.y - two.y)
  distance = Math.sqrt(x + y)
  one_radius = one.diameter / 2
  two_radius = two.diameter / 2
  combined_radii = one_radius + two_radius
  if distance < combined_radii
    return true
  return false