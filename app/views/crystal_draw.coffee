crystal_draw = (p5,x,y,fullness) ->
  fullness *= 3
  p5.fill(fullness%255/10,fullness%255/10,fullness%255)
  p5.triangle(x,y + 20,x + 10, y, x + 20, y + 20)
