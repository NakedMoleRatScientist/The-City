class HelpDrawMinorMode
  constructor: (@p5) ->
  draw: (object) ->
    @p5.background(0)
    @p5.textFont("monospace",20)
    @p5.text("Map Navigation",10,100)
    @p5.textFont("monospace",15)
    boxedText(@p5,30,120,"w")
    @p5.text(" - up",515,100)
