class mapDraw
  constructor: (@width, @height) ->

  draw: (p5) ->
    p5.noFill()
    p5.stroke(255)
    p5.rect(0,0,100,100)