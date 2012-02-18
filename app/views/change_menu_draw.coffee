menuDraw = (toggle,p5) ->
  switch(toggle)
    when 0
      menuDraw(p5)
      gameMenuDraw(p5)
    when 1
      menuDraw(p5)
      buildMenuDraw(p5)
