camera_input = (key, map) ->
  if (key.code == 97)
    map.move_camera(-1,0)
