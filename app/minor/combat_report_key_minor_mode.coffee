class CombatReportKeyMinorMode
  constructor: (@p5) ->
  key_pressed: () ->
    console.log(@p5.key.code)
    switch (@p5.key.code)
      when 113
        return "back"
      when 10
        return "select"
      when 119
        return "up"
      when 115
        return "down"
      when 97
        return "previous"
