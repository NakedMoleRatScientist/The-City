class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
    @options = new TextOptions()
    @state = -1
  update: () ->
    @options.clean()
    if @state == -1
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
        if @state == -1
          @state = @options.pointer
          this.update()
      when "back"
        @parent.state = -1
      when "previous"
        console.log("EEE")
        @state = -1

  input_info: (@msg) ->
  update_draw: () ->
    if @state == -1
      return (summaries: @options.options, pointer: @options.pointer, state: @parent.state, type: 0)
    else
      return (log: @options.options, pointer: @options.pointer, state: @parent.state, type: 1)
