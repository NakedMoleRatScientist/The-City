camera_input = (key, map) ->
  console.log(key.code)
  if key.code == 97
    map.move_camera(-1,0)
  else if key.code == 100
    map.move_camera(1,0)
  else if key.code == 115
    map.move_camera(0,1)
  else if key.code == 119
    map.move_camera(0,-1)