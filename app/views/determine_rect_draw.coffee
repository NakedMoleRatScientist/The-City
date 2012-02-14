determineRectDraw = (location,x,y,p5) ->
  switch(location.name)
    when "floor"
      floor_draw(p5,x,y)
    when "crystal_tree" #Crystal tree
      crystal_tree_draw(p5,x,y)
    when "crystal_stockpile" #Crystal stockpile
      crystal_stockpile_draw(p5,x,y)
    when "crystal"
      crystal_draw(p5,x,y,location.items)
