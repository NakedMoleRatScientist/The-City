class TextOptions
  constructor: (@p5,@x,@y,@size) ->
    @pointer = 0

    @texts = []
  add: (text) ->
    @texts.push(text)
  draw: () ->
    @p5.textFont("Monospace",@size)
    y = @y
    for data in @texts
      @p5.text(data,@x,y)
    @p5.ellipse(@x - 20,@y,10,10)