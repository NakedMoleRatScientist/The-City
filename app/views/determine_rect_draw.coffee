determineRectDraw = (location,x,y,p5) ->
  delay_draw = []
  switch(location.name)
    when "floor"
      floor_draw(p5,x,y)
    when "crystal_tree" #Crystal tree
      crystal_tree_draw(p5,x,y)
    when "crystal_stockpile" #Crystal stockpile
      crystal_stockpile_draw(p5,x,y)
    when "crystal"
      delay_draw.push(delay_draw)
  for d in delay_draw
    crystal_draw(p5,x,y,d.items,d.background)
