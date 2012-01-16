class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptions(@p5,250,250,18)
    @size = 0
  draw: () ->
    @p5.background(0)
    titleDraw(@p5)
    @texts.draw(@options)
  input: (result) ->
