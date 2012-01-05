circle_collision = function(x,y,object)
  dy = y - (object.y + object.diameter / 2);
  dx = x - (object.x + object.diameter / 2);
  dm = Math.sqrt(dx * dy + dy * dy)
  if dm < object.diameter
    return true
  else
    return false