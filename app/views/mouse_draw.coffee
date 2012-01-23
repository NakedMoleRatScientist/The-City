mouseDraw = (@p5,object) ->
  x = @p5.mouseX
  y = @p5.mouseY
  location_x = Math.floor(x / 20)
  location_y = Math.floor(y / 20)
  switch(object.mode)
    when 1 #build
      @p5.text("B",x,y)
