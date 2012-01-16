class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
    @options = new TextOptions()
  update: () ->
    @options.clean()
    for r in @parent.units.msg_manager.relations
      @options.add_text([r.summary()])
  act: ->
  input: (result) ->
    switch(result)
      when "up"
        @options.decrease()
      when "down"
        @options.increase()
  input_info: (@msg) ->
  update_draw: () ->
    return (summaries: @options.options, pointer: @pointer, state: @parent.state)
