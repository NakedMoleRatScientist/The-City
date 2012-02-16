approachesList = (location) ->
  approaches = []
  #left of location
  approaches.push(x: location.x - 1, y: location.y) if location.x - 1 < 0
  #right of location
  approaches.push(x: location.x + 1, y: location.y) if location.x + 1 > 99
  approaches.push(x: location.x, y: location.y - 1) if location.y - 1 < 0
  approaches.push(x: location.x, y: location.y + 1) if location.y + 1 > 99
  return approaches
