crystal_draw = (p5,x,y) ->
  p5.fill(0,0,255)
  p5.triangle(x,y + 20,x + 10, y, x + 20, y + 20)
