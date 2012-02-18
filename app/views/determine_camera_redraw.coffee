determineCameraRedraw = (map,old_camera) ->
  if old_camera.x == null || old_camera.y == null
    return true
  else if old_camera.x != map.camera_x || old_camera.y != map.camera_y
    return false
