class mapDraw
  constructor: (@width, @height) ->

  draw: (p5,map,x,y) ->

    p5.stroke(255)
    for height in [0..@height] when height < @height
      for width in [0..@width] when width < @width
        if map[height][width] == 1
          p5.noFill()
        else
          p5.fill()
        p5.rect(20 * (width + x),20 * (height + y),20,20)
