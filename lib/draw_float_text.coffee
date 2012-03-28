drawFloatText = (text,p5) ->
  if p5.__frameRate % 100
    text.decrease()