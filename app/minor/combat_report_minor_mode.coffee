class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
    @options = new TextOptions()
  update: () ->
    for r in @parent.units.msg_manager.relations
      @options.add_text([r.summary()])
    console.log(@options.options)
  act: ->
  input: (result) ->
  input_info: (@msg) ->
  update_draw: () ->
    return (summaries: @options.options, pointer: @pointer, state: @parent.state)
