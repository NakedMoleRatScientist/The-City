mouseDraw = (@p5,object) ->
  x = @p5.mouseX
  y = @p5.mouseY
  switch(object.type)
    when 1 #build
      @p5.text("B",x,y)
