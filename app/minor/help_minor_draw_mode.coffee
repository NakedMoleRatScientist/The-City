class HelpDrawMinorMode
  constructor: (@p5) ->
  draw: (object) ->
    @p5.text("Map Navigation",100,100)
    boxedText(@p5,500,100,"w")
    @p5.text(" - up",515,100)
