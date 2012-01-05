class TextOptions
  constructor: (@p5,@x,@y,size) ->
    @pointer = 0
    @p5.font("Monospace",size)
    @texts = []
  add: (text) ->
    @texts.push(text)