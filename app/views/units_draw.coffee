unitsDraw = (p5,units,map) ->
  for unit in units
    x = (unit.x - map.camera.x) * 20 + 5
    y = (unit.y - map.camera.y) * 20 + 20 #Need an extra 20 to get it to show in the correct location
    unitDraw(p5,unit,x,y)
