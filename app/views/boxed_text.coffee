boxedText = (p5,x,y,text) ->
  t = p5.text(text,x,y)
  p5.rect(x,y,t.width,t.height)
