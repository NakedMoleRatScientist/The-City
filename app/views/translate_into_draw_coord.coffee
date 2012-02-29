translateIntoDrawCoord = (object,map) ->
  transform = (x: (object.x - map.camera.x) * 20, y: (object.y - map.camera.y) * 20 )