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
        @state = -1
        @options.pointer = 0
        this.update()
      when "kills"
        @state = 2
        @options.pointer = 0
        this.update()

  input_info: (@msg) ->
  update_draw: () ->
    if @state == -1
      return (summaries: @options.options, pointer: @options.pointer, state: @parent.state, type: 0, kills: @parent.units.kills())
    else if @state == 0
      return (log: @options.options, pointer: @options.pointer, state: @parent.state, type: 1)
    else if @state == 1
      return (killers: @options.options, pointer: @options.pointer, type: 2)
