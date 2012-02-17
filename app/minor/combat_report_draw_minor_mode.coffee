class CombatReportDrawMinorMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,30,12,12)
  draw: (object) ->
    @p5.background(0)
    @p5.fill(255,0,0)
    switch(object.type)
      when 0
        @texts.draw(object.summaries,object.pointer)
        killsDraw(object.kills, @p5)
        combatMainMenuDraw(@p5)
        @p5.text("Colonists Dead Thus Far: " + object.fatalities,400,25)
      when 1
        @texts.draw(object.log,object.pointer)
      when 2
        msg = []
        for k in object.killers
          msg.push(k.name + ": " + k.kills)
        @texts.draw(msg,object.pointer)
      when 3
        msg = []
        @p5.text(object.name + " killed about " + object.kills.length + "beings",20,12 )
        @p5.text("Kill list:",30,20)
        for name in object.kills
          msg.push(name)
        @texts.offset_y = 30
        @texts.draw(msg,object.pointer)
