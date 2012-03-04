mouseDraw = (@p5,mouse,units,map) ->
  x = Math.floor(@p5.mouseX / 20)
  y = Math.floor(@p5.mouseY / 20)
  width = 0
  item = false
  switch(mouse.mode)
    when 0 #what is it
      for u in units
        cam_x = x + map.camera.x
        cam_y = y + map.camera.y
        if u.x == cam_x && u.y == y + cam_y
          item = u
          break
      item = map.select_last(x + map.camera.x,y + map.camera.y) unless item != false
      msg = item.name
      unless item == false
        @p5.noStroke()
        @p5.fill(255,0,0)
        #compensate for underscore being too low by fudging by -3
        if item.name == "crystal"
          msg = item.name + " : " + item.items
        msg += " (" + cam_x + "," + cam_y + ")"
    when 1 #build
      @p5.noStroke()
      @p5.fill(128,128,128)
      @p5.rect(x * 20,y * 20,20,20)
      @p5.fill(255,0,0)
      msg = "Crystal Pile"
  @p5.text(msg,x * 20,y * 20 - 3)
  width = @p5.textWidth(msg)
  Math.ceil(width / 20)