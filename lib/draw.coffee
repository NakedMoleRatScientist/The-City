
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.frameRate(50)
    p5.background(0)
    @map = new Map(100,100)
    @map.generate()
    @units = new Units()
    @units.units.push new Unit(10,10, "Miya",1)
    @units.units.push new Unit(10,20, "John",1)
    @units.units[1].hostility = 1
    @units.units[0].target = @units.units[1]
    @unit_draw = new unitDraw(p5,@units,@map)

  p5.keyPressed = () ->
    camera_input(p5.key,@map)

  p5.logic = () ->
    @units.move()

  p5.draw = () ->
    p5.background(0)
    map_draw = new mapDraw(100,100)
    map_draw.draw(p5,@map)
    @unit_draw.draw()
    p5.logic()



$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)