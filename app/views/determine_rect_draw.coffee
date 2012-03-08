determineRectDraw = (location,x,y,p5) ->
  switch(location.name)
    when "floor"
      floorDraw(p5,x,y)
    when "crystal_tree" #Crystal tree
      crystalTreeDraw(p5,x,y)
    when "crystal_stockpile" #Crystal stockpile
      return (x: x, y: y)
    when "crystal"
      crystalDraw(p5,x,y,location.items,location.background)
    when "wall"
      wallDraw(p5,x,y)
    when "debug"
      debug_draw(p5,x,y)
    when "tree"
      treeDraw(p5,x,y)
    when "tree_stockpile"
      woodStockpileDraw(p5,x,y)
    when "wood"
      woodDraw(p5,x,y)
  return true
