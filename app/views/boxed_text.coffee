boxedText = (p5,x,y,text) ->
  t = p5.text(text,x,y)
  p5.noFill()
  p5.stroke(255)
  x = x - 3
  y = y - p5.textAscent() - 3
  width = p5.textWidth(text) + 3
  height = p5.textAscent(text) + 3
  p5.rect(x,y,width,height)
  (x: x, y: y, width: width, height: height)
