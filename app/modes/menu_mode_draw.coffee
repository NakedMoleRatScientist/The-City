class MenuModeDraw
  constructor: (@p5) ->
    @texts = new TextOptions(@p5,250,250,18)
    @texts.add("New Game")
    @texts.add("Test Arena")
  draw: () ->
    @p5.background(0)
    titleDraw(@p5)
    @texts.draw()
  input: (result) ->
    if result == true
      @texts.increase()