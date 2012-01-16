class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
    @options = new TextOptions()
  update: () ->
    for r in @parent.units.msg_manager.relations
      @options.add_text([r.summary()])
  act: ->
  input: (result) ->
  input_info: (@msg) ->
  update_draw: () ->
    return (options: @options.options, pointer: @pointer, state: @parent.state)
