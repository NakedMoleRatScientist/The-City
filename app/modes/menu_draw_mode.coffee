class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,300,250,18)
    @size = 0
  draw: (object) ->
    @p5.background(0)
    frameRateDraw(@p5)
    titleDraw(@p5)
    @texts.draw(object.options,object.pointer)
    boxedText(@p5,100,100,"W")
  input: (result) ->
