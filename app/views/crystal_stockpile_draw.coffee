crystal_stockpile_draw = (p5,x,y) ->
  p5.noFill()
  p5.stroke(135,206,255)
  p5.rect(x - 40 ,y - 40,100,100)
  p5.fill(135,206,255)
  p5.rect(x,y,20,20)
