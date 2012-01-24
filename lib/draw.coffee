
menu = (p5) ->


  p5.setup = () ->
    p5.size(800, 600)
    p5.frameRate(50)
    p5.background(0)
    @mode = 1
    @logic_manager = new ModeManager()
    @draw_manager = new DrawModeManager(p5)
    @key_manager = new KeyModeManager(p5)

  p5.keyPressed = () ->
    p5.input_result(@key_manager.key_pressed(@mode,@logic_manager))

  p5.mousePressed = () ->
    p5.mouse_input(@key_manager.mouse_pressed(@mode,@logic_manager))

  p5.mouse_input = (result) ->
    @logic_manager.mouse_input(@mode,result)
  p5.input_result = (result) ->
    @logic_manager.input(@mode,result)
    @draw_manager.input(@mode,result)
    @mode = @logic_manager.update_mode(@mode)
  p5.logic = () ->
    @logic_manager.act(@mode)
    @draw_manager.draw(@mode,@logic_manager)


  p5.draw = () ->
    p5.logic()



$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)
