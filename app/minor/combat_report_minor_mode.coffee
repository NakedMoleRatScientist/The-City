class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
    @options = new TextOptions()
    @state = null
  update: () ->
    @options.clean()
    if @state == null
      for r in @parent.units.msg_manager.relations
        @options.add_text([r.summary()])
    else
      @options.add_text(@parent.units.msg_manager.relations[@state].msgs)
  act: ->
  input: (result) ->
    switch(result)
      when "up"
        @options.decrease()
      when "down"
        @options.increase()
      when "select"
        if @state == null
          @state = @options.pointer
          this.update()

  input_info: (@msg) ->
  update_draw: () ->
    if @state == null
      return (summaries: @options.options, pointer: @options.pointer, state: @parent.state, type: 0)
    else
      return (log: @options.options, pointer: @options.pointer, state: @parent.state, type: 1)
