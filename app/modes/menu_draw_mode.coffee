class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,300,250,18)
    @size = 0
  draw: (object) ->
    @p5.background(0)
    frameRateDraw(@p5)
    titleDraw(@p5)
    @texts.draw(object.options,object.pointer)
    boxedText(@p5,400,100,"w")
    @p5.text(" - up",415,100)
    boxedText(@p5,400,120,"s")
    @p5.text(" - down",415,120)
  input: (result) ->
