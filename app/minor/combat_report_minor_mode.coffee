class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
    @options = new TextOptions()
    @state = 0
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
      when "select"
        @options.pointer
  input_info: (@msg) ->
  update_draw: () ->
    return (summaries: @options.options, pointer: @pointer, state: @parent.state)
