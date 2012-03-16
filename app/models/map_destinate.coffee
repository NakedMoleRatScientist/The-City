class MapDestinate
  constructor: (@map) ->
  decide_stock: (mouse,x,y) ->
    switch(mouse.build)
      when "tree"
        return new timberStock(x,y)
      when "crystal"
        return new CrystalStock(x,y)
  add_stockpile:(mouse) ->
    x = Math.floor(mouse.x / 20) + @map.camera.x
    y = Math.floor(mouse.y / 20) + @map.camera.y
    return if x < 2 || x > 97
    return if y < 2 || y > 97
    newpoint = this.decide_stock(mouse,x,y)
    unless @map.stockpoints_collision_detect(newpoint) == true || @map.collision.propose_drop(x,y) == false
      @map.map[y][x].push(newpoint)
      @map.stockpoints.push(newpoint)
  exclude: (list,stockpile) ->
    new_list = []
    console.log("original " + list.length)
    for l in list
      if pointToRectCollision(l,stockpile)
        new_list.push(l)
    console.log("now " + new_list.length)
    new_list