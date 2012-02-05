nearest_edge = (object) ->
  list = []
  list.push(x: 0, y: object.y) #left edge
  list.push(x: 99, y: object.y) #right edge
  list.push(x: object.x, y: 99) #bottom edge
  list.push(x: object.x, y: 0) #top edge
  nearest_object(object,list)
