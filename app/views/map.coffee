class mapDraw
  constructor: (@width, @height) ->

  draw: (p5) ->
    p5.noFill()
    p5.stroke(255)
    for width in [0..@width] when width < @width
      console.log(width)
      p5.rect(20 * width,0,20,20)