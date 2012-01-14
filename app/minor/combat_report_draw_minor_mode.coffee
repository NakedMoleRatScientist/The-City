class CombatReportDrawMinorMode
  constructor: (@p5) ->
    @texts = new TextOptions(@p5,5,0,12)
  draw: (object) ->
    @p5.background(0)
    relations = object.relations
    y = 0
    for r in relations
      @p5.text(r.summary(),5,y += 12)
