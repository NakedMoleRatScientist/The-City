class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
    @options = new TextOptions()
    @options.add_text()
    for r in @parent.unit.msg_manager.relations
      @options.add_text(r.summary())

  act: ->
  input: (result) ->
  input_info: (@msg) ->
  update_draw: () ->
    return (relations: @relations, pointer: @pointer, state: @parent.state)
