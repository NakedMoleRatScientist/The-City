draw_dirty_rects = (dirty,map,p5) ->
  for d in dirty
    location = map.map[d.y][d.x]
    x = (d.x - map.camera_x) * 20
    y = (d.y - map.camera_y) * 20
    if location != null
      this.determine_draw(location,x,y)
    else
      p5.noStroke()
      p5.fill(0)
      p5.rect(x,y,20,20)
