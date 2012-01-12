class CombatReportDrawMinorMode
  constructor: (@p5) ->
  draw: (object) ->
    @p5.background(0)
    msgs = object.msgs
    y = 0
    for m in msgs
      @p5.text(m,5,y += 10)