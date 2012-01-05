class TextOptions
  constructor: (@p5,@x,@y,size) ->
    @pointer = 0
    @p5.textFont("Monospace",size)
    @texts = []
  add: (text) ->
    @texts.push(text)
  draw: () ->
    y = @y
    for data in @texts
      @p5.text(data,@x,y += @size)
    @p5.ellipse(@x - 20,@y,10,10)