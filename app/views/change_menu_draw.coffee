changeMenuDraw = (toggle,previous,map,p5) ->
  if previous != toggle
    switch(toggle)
      when -1
        mapDraw(map,p5)
