class CombatReportDrawMinorMode
  constructor: (@p5) ->
    @texts = new TextOptions(@p5,5,12,12)
  draw: (object) ->
    @p5.background(0)
    relations = object.relations
    reports = []
    for r in relations
      reports.push(r.summary())
    @texts.draw(reports)
