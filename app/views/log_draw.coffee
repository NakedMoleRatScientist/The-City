logDraw = (p5,x,y,dir) ->
  p5.stroke(0,100,0)
  p5.fill(0)
  if dir == "x"
    p5.line(x,y,x + 19,y)
    p5.line(x,y,x + 19,y + 10)
  p5.line(x,y,x,y + 19)
  p5.line(x + 5,y,x + 5,y + 19)