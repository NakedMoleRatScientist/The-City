class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,250,250,18)
    @size = 0
  draw: (object) ->
    @p5.background(0)
    frameRateDraw(@p5)
    titleDraw(@p5)
    boxedText("blah",100,100)
    @texts.draw(object.options,object.pointer)
  input: (result) ->
