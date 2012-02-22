class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,300,250,18)
    @size = 0
  draw: (object) ->
    @p5.background(0)
    frameRateDraw(@p5)
    titleDraw(@p5)
    @texts.draw(object.options,object.pointer)
    boxedText(@p5,100,100,"w")
    @p5.text(" - up",115,100)
  input: (result) ->
