
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.frameRate(50)
    p5.background(0)
    @mode = 1
    @draw_mode = new ModeDraw(p5)
    @logic_mode = new Mode()
    @key_mode = new ModeKey()
  p5.keyPressed = () ->
#    camera_input(p5.key,@map)

  p5.logic = () ->
    @logic_mode.act(@mode)
    @draw_mode.draw(@mode)


  p5.draw = () ->
    p5.logic()



$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)