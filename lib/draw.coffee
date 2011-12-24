
menu = (p5) ->
  p5.setup = () ->
    p5.size($(window).width(), $(window).height())
    p5.background(0)

  p5.draw = () ->
    map = new mapDraw(100,100)
    map.draw(p5)

$(document).ready ->
  canvas = document.getElementById "processing"

  processing = new Processing(canvas, menu)