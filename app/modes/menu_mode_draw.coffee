class MenuModeDraw
  constructor: (@p5) ->
    @texts = new TextOptions(@p5,250,250,18)
    @texts.add("New Game")
    @texts.add("Test Arena")
  draw: () ->
    titleDraw(@p5)
    @texts.draw()
  input: (result) ->
    if result == true
      @texts.pointer += 1