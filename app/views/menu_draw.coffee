menuDraw = (toggle,p5) ->
  switch(toggle)
    when -1
      mapDraw(p5)
    when 0
      backgroundMenuDraw(p5)
      gameMenuDraw(p5)
    when 1
      backgroundMenuDraw(p5)
      buildMenuDraw(p5)
