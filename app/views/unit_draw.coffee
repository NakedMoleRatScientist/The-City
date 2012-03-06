unitDraw = (p5,unit,x,y)
  case unit.gender
    when 0
      #blue
      p5.fill(0,0,25)
    when 1
      #pink
      p5.fill(255,192,203)
  switch unit.type
    when 1
      p5.text("H",x,y)