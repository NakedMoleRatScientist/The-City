class CombatReportDrawMinorMode
  constructor: (@p5) ->
  draw: (state) ->
    return if state == -1
