drawFloatText = (text,p5) ->
  if p5.frameCount % 5 == 0
    text.decrease()
  text.change_pos()
  if text.time > 0
    return boxedText(p5,text.x * 20 + text.pos_x,text.y * 20 + text.pos_y,text.msg)
  false