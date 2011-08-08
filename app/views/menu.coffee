menu = (p5) ->
  p5.setup = () ->
    p5.size($(window).width(), $(window).height())
    p5.background(0)

  p5.draw = () ->
    p5.background(p5.frameCount)
  
class Bean
  constructor: (p5, opts) ->

$(document).ready ->
  canvas = document.getElementById "processing"
  
  processing = new Processing(canvas, coffee_draw)