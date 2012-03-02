rect_to_many_rect_collision = (individual,many) ->
  for against in many
    return true if rect_to_rect_collision(individual,against)
  false