class MenuModeDraw
  constructor: (@p5) ->
    @radio = new RadioButton(@p5,100,100)
  draw: () ->
    titleDraw(@p5)
    @radio.draw()