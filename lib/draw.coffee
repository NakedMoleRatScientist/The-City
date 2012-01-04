
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.frameRate(50)
    p5.background(0)

  p5.keyPressed = () ->
    camera_input(p5.key,@map)

  p5.logic = () ->
    @units.move()
    @message.update(@units.units)
    @units.clean()


  p5.draw = () ->
    p5.background(0)
    map_draw = new mapDraw(100,100)
    map_draw.draw(p5,@map)
    @unit_draw.draw()
    message_draw(p5,@message.msg[@message.msg.length - 1])
    p5.logic()



$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)