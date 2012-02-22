boxedText = (p5,x,y,text) ->
  t = p5.text(text,x,y)
  p5.noFill()
  p5.rect(x,y - p5.textAscent(),p5.textWidth(text),p5.textAscent())
