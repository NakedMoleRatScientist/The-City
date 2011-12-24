
menu = (p5) ->


  p5.setup = () ->
    p5.size($(window).width(), $(window).height())
    p5.frameRate(50)
    p5.background(0)
    @map = new Map(100,100)
    @map.generate()

  p5.draw = () ->
    map_draw = new mapDraw(100,100)
    map_draw.draw(p5,@map.result())

$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)