draw = (p5) ->
  p5.setup = () ->
    p5.size(1000,1000)
    p5.background(0)
    
$(document).ready ->
  canvas = document.getElementById "processing"
  
  processing = new Processing(canvas, draw)