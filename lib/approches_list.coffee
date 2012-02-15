approachesList = (location) ->
  approaches = []
  approaches.push(x: location.x - 1, y: location.y) #left of location
  approaches.push(x: location.x + 1, y: location.y) #right of location
  approaches.push(x: location.x, y: location.y - 1) #top of location
  approaches.push(x: location.x, y: location.y + 1) #below of location
  return approaches
