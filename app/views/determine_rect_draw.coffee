determineRectDraw = (location,x,y,p5) ->
  switch(location.name)
    when "floor"
      floor_draw(p5,x,y)
    when "crystal_tree" #Crystal tree
      crystal_tree_draw(p5,x,y)
    when "crystal_stockpile" #Crystal stockpile
      return (x: x, y: y)
    when "crystal"
      crystal_draw(p5,x,y,location.items,location.background)
    when "wall"
      wallDraw(p5,x,y)
  return true
