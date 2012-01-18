class CombatReportDrawMinorMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,30,12,12)
  draw: (object) ->
    @p5.background(0)
    switch(object.type)
      when 0
        @texts.draw(object.summaries,object.pointer)
        killsDraw(object.kills, @p5)
        combatMenuDraw(@p5)
      when 1
        @texts.draw(object.log,object.pointer)
      when 2
        @texts.draw(object.killers,object.pointer)
