
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.frameRate(50)
    p5.background(0)
    @map = new Map(100,100)
    @map.generate()
    @unit = new Unit(10,10,"Miya",1)
    @unit.set_move(20,1)

  p5.keyPressed = () ->
    camera_input(p5.key,@map)

  p5.logic = () ->
    @unit.move()

  p5.draw = () ->
    p5.background(0)
    map_draw = new mapDraw(100,100)
    map_draw.draw(p5,@map.result(),@map.camera_x,@map.camera_y)
    unit_draw = new unitDraw()
    unit_draw.draw(p5,@unit)
    p5.logic()



$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)