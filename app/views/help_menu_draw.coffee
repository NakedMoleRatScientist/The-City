helpMenuDraw = (@p5) ->
  x = 705
  y = 140
  height = 15
  menuTitleText(@p5,"Help Menu")
  @p5.fill(255,255,0)
  @p5.text("q - back",x,y)