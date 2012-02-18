menuDraw = (toggle,p5) ->
  switch(toggle)
    when 0
      backgroundMenuDraw(p5)
      gameMenuDraw(p5)
    when 1
      backgroundMenuDraw(p5)
      buildMenuDraw(p5)
