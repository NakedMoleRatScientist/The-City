class TextOptions
  constructor: (@p5,@x,@y,@size) ->
    @pointer = 0
    @length = 0
  increase: () ->
    if @pointer < @length
      @pointer += 1
    else
      @pointer = 0
  decrease: () ->
    if @pointer == 0
      @pointer = @length
    else
      @pointer -= 1
  draw: (texts) ->
    @p5.textFont("Monospace",@size)
    y = @y
    for data in texts
      @p5.text(data,@x,y)
      y += @size
    pointer_y = @y + (@pointer * @size)
    @p5.ellipse(@x - 20,pointer_y - (@size / 2),10,10)
