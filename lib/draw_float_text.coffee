drawFloatText = (text,p5) ->
  if p5.__frameRate % 500
    text.decrease()
    text.change_pos()
  if text.time > 0
    boxedText(p5,text.x,text.y,text.msg)