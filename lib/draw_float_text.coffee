drawFloatText = (text,p5) ->
  if p5.__frameRate % 100
    text.decrease()
    text.change_pos()
  if text.time > 0
    p5.text(text.msg,text.x,text.y)