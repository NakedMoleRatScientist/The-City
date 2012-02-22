boxedText = (p5,x,y,text) ->
  t = p5.text(text,x,y)
  p5.noFill()
  p5.stroke()
  p5.rect(x - 3,y - p5.textAscent() - 3,p5.textWidth(text) + 3,p5.textAscent() + 3)
