class CombatReportKeyMinorMode
  constructor: (@p5) ->
  key_pressed: () ->
    console.log(@p5.key.code)
