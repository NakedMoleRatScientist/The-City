nearest_object = (object,list) ->
  shortest = 1000
  target = null
  for l in list
    distance = distance_between_two_points(object,l)
    if distance < shortest
      shortest = distance
      target = t
  return target