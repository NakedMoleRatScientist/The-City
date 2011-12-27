camera_input = (key) ->
  if (key.code == 97)
    @map.move_camera(-1,0)
