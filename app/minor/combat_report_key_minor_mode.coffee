class CombatReportKeyMinorMode
  constructor: (@p5) ->
  key_pressed: () ->
    console.log(@p5.key.code)
    switch (@p5.key.code)
      when 113
        return "back"
