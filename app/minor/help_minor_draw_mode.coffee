class HelpDrawMinorMode
  constructor: (@p5) ->
  draw: (object) ->
    @p5.background(0)
    @p5.textFont("monospace",20)
    @p5.text("Map Navigation",10,100)
    @p5.textFont("monospace",15)
    boxedText(@p5,30,120,"w")
    boxedText(@p5,10,140,"a")
    boxedText(@p5,30,140,"s")
    boxedText(@p5,50,140,"d")
    @p5.text("w - up",10,150)
    @p5.text("a - left",10,170)
    @p5.text("s - down",10,190)
    @p5.text("d - right",10,210)