mouseDraw = (@p5,mouse,units,map) ->
  x = @p5.mouseX
  y = @p5.mouseY
  location_x = Math.floor(x / 20)
  location_y = Math.floor(y / 20)
  width = 0
  item = false
  switch(mouse.mode)
    when 0 #what is it
      x = location_x
      y = location_y

      for u in units
        if u.x == x + map.camera.x && u.y == y + map.camera.y
          item = u
          break
      item = map.select_last(x + map.camera.x,y + map.camera.y) unless item != false
      msg = item.name
      unless item == false
        @p5.noStroke()
        @p5.fill(255,0,0)
        #compensate for underscore being too low by fudging by -3
        if item.items != null
          msg = item.name + " : " + item.items
        @p5.text(msg,x * 20, y * 20 - 3)
        width = @p5.textWidth(msg)
    when 1 #build
      @p5.noStroke()
      @p5.fill(128,128,128)
      @p5.rect(location_x * 20,location_y * 20,20,20)
      @p5.fill(255,0,0)
      msg = "Crystal Pile"
      @p5.text(msg,location_x * 20,location_y * 20)
      width = @p5.textWidth(msg)
  Math.ceil(width / 20)