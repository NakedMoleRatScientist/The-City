changeMenuDraw = (toggle,previous,map,p5) ->
  if previous != toggle
    switch(toggle)
      when -1
        mapDraw(map,p5)
      when 0
        menuDraw(p5)
        gameMenuDraw(p5)
      when 1
        menuDraw(p5)
        buildMenuDraw(p5)
