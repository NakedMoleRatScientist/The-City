mouseDraw = (@p5,mouse,map) ->
  x = @p5.mouseX
  y = @p5.mouseY
  location_x = Math.floor(x / 20)
  location_y = Math.floor(y / 20)
  width = 0
  switch(mouse.mode)
    when 0 #what is it
      x = location_x + map.camera_x
      y = location_y + map.camera_y
      item = map.select_last(x,y)
      unless item == false
        @p5.noStroke()
        @p5.fill(255,0,0)
        @p5.text(item.name,x * 20, y * 20)
        width = @p5.textWidth(item.name)
    when 1 #build
      @p5.noStroke()
      @p5.fill(128,128,128)
      @p5.rect(location_x * 20,location_y * 20,20,20)
      @p5.fill(255,0,0)
      msg = "Crystal Pile"
      @p5.text(msg,location_x * 20,location_y * 20)
      width = @p5.textWidth(msg)