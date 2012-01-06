listDraw = (p5,@logic) ->
  #Should correspond with list modes
  [new GameModeDraw(p5,@logic.get(0)),new MenuModeDraw(p5,@logic.get(1))]