class mapDraw
  constructor: (@width, @height) ->

  draw: (p5) ->
    p5.noFill()
    p5.stroke(255)
    for height in [0..@height] when height < @height
      for width in [0..@width] when width < @width
        p5.rect(20 * width,20 * height,20,20)