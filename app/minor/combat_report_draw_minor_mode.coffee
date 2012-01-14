class CombatReportDrawMinorMode
  constructor: (@p5) ->
  draw: (object) ->
    @p5.background(0)
    relations = object.relations
    y = 0
    for r in relations
      @p5.text(r.summary(),5,y += 12)
