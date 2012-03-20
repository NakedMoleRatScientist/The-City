logDraw = (p5,x,y,dir,part) ->
  p5.stroke(0,100,0)
  p5.fill(0)
  if dir == "left" || dir == "right"
    p5.line(x,y,x + 19,y)
    p5.line(x,y + 10,x + 19,y + 10)
  else
    p5.line(x,y,x,y + 19)
    p5.line(x + 5,y,x + 5,y + 19)
  if part == "begin"
    p5.line(x + 19,y,x,y + 19)
  else if part == "end"
    p5.line(x,y,x,y + 19)
