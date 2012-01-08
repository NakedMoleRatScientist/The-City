
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.frameRate(50)
    p5.background(0)
    @talk = new Talk()
    @mode = 1
    @logic_mode = new Mode()
    @draw_mode = new DrawMode(p5)
    @key_mode = new ModeKey(@talk)

  p5.keyPressed = () ->
    p5.input_result(@key_mode.key_pressed(@mode,p5.key))

  p5.input_result = (result) ->
    @logic_mode.input(@mode,result)
    @draw_mode.input(@mode,result)
    @mode = changeMode(@mode,result)

  p5.logic = () ->
    @logic_mode.act(@mode)
    @draw_mode.draw(@mode,@logic_mode)


  p5.draw = () ->
    p5.logic()



$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)