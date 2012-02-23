class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,300,250,18)
    @size = 0
  draw: (object) ->
    @p5.background(0)
    frameRateDraw(@p5)
    titleDraw(@p5)
    @texts.draw(object.options,object.pointer)
    boxedText(@p5,350,100,"w")
    @p5.text(" - up",365,100)
    boxedText(@p5,350,120,"s")
    @p5.text(" - down",365,120)
  input: (result) ->
