class CombatReportDrawMinorMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,30,12,12)
  draw: (object) ->
    @p5.background(0)
    if object.type == 0
      @texts.draw(object.summaries,object.pointer)
      killsDraw(object.kills, @p5)
      combatMenuDraw(@p5)
    else
      @texts.draw(object.log,object.pointer)
