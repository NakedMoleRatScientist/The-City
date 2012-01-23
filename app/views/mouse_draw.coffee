mouseDraw = (@p5,object,camera_x,camera_y) ->
  x = @p5.mouseX
  y = @p5.mouseY
  location_x = Math.floor(x / 20)
  location_y = Math.floor(y / 20)
  switch(object.mode)
    when 1 #build
      @p5.text("B",x,y)

      @p5.rect(location_x + camera_x,location_y + camera_y,20,20)
