logDraw = (p5,x,y,dir) ->
  p5.stroke(0,100,0)
  p5.fill(0)
  p5.line(x,y,x,y + 19)
  p5.line(x + 14,y,x,y + 19)