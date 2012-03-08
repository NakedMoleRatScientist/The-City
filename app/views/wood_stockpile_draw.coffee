treeStockpileDraw = (p5,x,y) ->
  p5.noFill()
  p5.stroke(0,100,0)
  p5.rect(x - 39, y - 39, 99, 99)
  p5.fill(0,100,0)
  p5.rect(x,y,20,20)