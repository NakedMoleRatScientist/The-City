translateIntoDrawCoord = (object,map) ->
  transform = (x: (object.x - map.camera_x) * 20, y: (object.y - map.camera_y) * 20 )