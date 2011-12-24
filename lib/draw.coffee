
menu = (p5) ->


  p5.setup = () ->
    p5.size($(window).width(), $(window).height())
    p5.frameRate(50)
    p5.background(0)
    @map = new Map(100,100)
    @map.generate()
    @unit = new Unit(10,10,"Miya",1)

  p5.draw = () ->
    map_draw = new mapDraw(100,100)
    map_draw.draw(p5,@map.result())
    unit_draw = new unitDraw()
    unit_draw.draw(p5,@unit)

$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)