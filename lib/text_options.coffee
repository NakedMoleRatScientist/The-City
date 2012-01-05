class TextOptions
  constructor: (@p5,@x,@y,@size) ->
    @pointer = 1
    @texts = []
  add: (text) ->
    @texts.push(text)
  increase: () ->
    @pointer += 1
    if @pointer > @texts.length
      @pointer = 1
  draw: () ->
    @p5.textFont("Monospace",@size)
    y = @y
    for data in @texts
      @p5.text(data,@x,y)
      y += @size
    @p5.ellipse(@x - 20,(@y * @pointer) - (@size / 2),10,10)