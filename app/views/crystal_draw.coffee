crystal_draw = (p5,x,y,fullness) ->
  p5.fill(0,0,255)
  lighten = p5.brightness(fullness * 2)
  p5.fill(lighten)
  p5.triangle(x,y + 20,x + 10, y, x + 20, y + 20)
