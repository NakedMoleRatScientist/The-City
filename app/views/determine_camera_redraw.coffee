determineCameraRedraw = (map,old_camera) ->
  if old_camera.x == null || old_camera.y == null
    return true
  else if old_camera.x != map.camera.x || old_camera.y != map.camera.y
    return true
