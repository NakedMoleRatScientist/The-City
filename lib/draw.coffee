
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.frameRate(50)
    p5.background(0)
    @mode = 1
    draw = new ModeDraw(p5)
    logic = new Mode()

  p5.keyPressed = () ->
#    camera_input(p5.key,@map)

  p5.logic = () ->
    logic.act(@mode)
    draw.draw(@mode)


  p5.draw = () ->
    p5.logic()



$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)