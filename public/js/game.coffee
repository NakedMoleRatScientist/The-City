# /js/coffee_draw.coffee

  # Our main sketch object:
  coffee_draw = (p5) ->

    # processing's "init" method:

    p5.setup = () ->
      p5.size(1000,1000)
      p5.background(0)

    # where the fun stuff happens:
    p5.draw = () ->



  $(document).ready ->
    canvas = document.getElementById "processing"

    processing = new Processing(canvas, coffee_draw)