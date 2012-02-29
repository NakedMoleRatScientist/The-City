frameRateDraw = (@p5) ->
  @p5.fill(0)
  @p5.noStroke()
  @p5.rect(200,0,50,20)
  @p5.fill(255)
  @p5.textSize("monospace",15)
  @p5.text("FPS: " + Math.floor(@p5.__frameRate),200,15)
