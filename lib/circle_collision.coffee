circle_collision = (x,y,object) ->
  dy = y - (object.y + object.diameter / 2);
  dx = x - (object.x + object.diameter / 2);
  dm = Math.sqrt(dx * dx + dy * dy)
  if dm < object.diameter
    return true
  else
    return false