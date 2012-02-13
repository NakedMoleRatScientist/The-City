changeMenuDraw = (toggle,previous,map,p5) ->
  if previous != toggle
    if toggle == -1
      mapDraw(map,p5)
