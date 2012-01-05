class RadioButton
  constructor: (@p5,@x,@y) ->
    @height = 10
    @width = 10
    @radius = @height / 2
    @diameter = @radius * 2
  draw: () ->
    @p5.stroke(255)
    @p5.ellipse(@x,@y,@width,@height)
    @p5.stroke(255)
    @p5.ellipse(@x,@y,@width / 2,@height / 2)