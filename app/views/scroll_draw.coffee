scrollDraw = (@p5,select) ->
  @p5.text("s - scroll down",0,580)
  @p5.text("w - scroll up",100,580)
  if select == true
    @p5.text("return/enter - select",200,580)