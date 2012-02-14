frameRateDraw = (@p5) ->
  @p5.fill(0)
  @p5.rect(200,0,50,20)
  @p5.fill(255)
  @p5.textSize(15)
  @p5.text("FPS: " + @p5.__frameRate,200,15)
