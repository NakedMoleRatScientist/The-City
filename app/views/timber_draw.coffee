woodDraw = (p5,x,y,items) ->
  p5.fill(0,items * 20,0)
  p5.stroke(0,100,0)
  p5.rect(x,y + 5,19,5)