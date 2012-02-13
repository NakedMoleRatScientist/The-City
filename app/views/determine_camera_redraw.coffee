determineCameraRedraw = (map,old_camera,p5) ->
  if old_camera.x == null || old_camera.y == null
    mapDraw(map,p5)
  else if old_camera.x != map.camera_x || old_camera.y != map.camera_y
    mapDraw(map,p5)
