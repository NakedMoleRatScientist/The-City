circle_to_circle_collision = (one, two) ->
  distance = distance_between_two_points(one,two)
  one_radius = one.diameter / 2
  two_radius = two.diameter / 2
  combined_radii = one_radius + two_radius
  if distance < combined_radii
    return true
  return false