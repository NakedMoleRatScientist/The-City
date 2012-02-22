gameMenuDraw = (@p5) ->
  x = 705
  y = 140
  height = 15
  menuTitleText(@p5,"Game Menu")
  @p5.fill(255,255,0)
  @p5.text("b - build", x, y)
  @p5.text("m - hide menu", x, y += height)
  @p5.text("q - back", x, y += height)
