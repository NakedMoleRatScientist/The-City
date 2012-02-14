mouseDraw = (@p5,mouse) ->
  x = @p5.mouseX
  y = @p5.mouseY
  location_x = Math.floor(x / 20)
  location_y = Math.floor(y / 20)
  switch(mouse.mode)
    when 1 #build
      @p5.noStroke()
      @p5.fill(128,128,128)
      @p5.rect(location_x * 20,location_y * 20,20,20)
      @p5.fill(255,0,0)
      @p5.text("Crystal Pile",location_x * 20,location_y * 20)
