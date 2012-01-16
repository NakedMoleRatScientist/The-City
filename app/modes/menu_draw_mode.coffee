class MenuDrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,250,250,18)
    @size = 0
  draw: (object) ->
    @p5.background(0)
    titleDraw(@p5)
    @texts.draw(object.options,object.pointer)
  input: (result) ->
