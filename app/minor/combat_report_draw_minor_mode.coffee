class CombatReportDrawMinorMode
  constructor: (@p5) ->
  draw: (state,minor) ->
    return if state == -1
