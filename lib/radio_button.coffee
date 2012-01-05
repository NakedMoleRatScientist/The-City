class RadioButton
  constructor: (@p5,@x,@y) ->
    @height = 10
    @width = 10
    @radius = @height / 2
    @diameter = @radius * 2
    @state = false
  draw: () ->
    @p5.noFill()
    @p5.stroke(255)
    @p5.ellipse(@x,@y,@width,@height)
    if @state == true
      @p5.fill()
      @p5.stroke(255)
      @p5.ellipse(@x,@y,@width / 2,@height / 2)