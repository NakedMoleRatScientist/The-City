class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
  act: ->
  input: (result) ->
    if result == "report"
      @parent.state = 1
  input_info: (@msg) ->
  update_draw: () ->
