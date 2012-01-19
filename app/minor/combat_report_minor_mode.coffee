class CombatReportMinorMode
  constructor:(@parent) ->
    @msg = []
    @options = new TextOptions()
    @state = -1
  update: () ->
    @options.clean()
    switch(@state)
      when -1
        for r in @parent.units.msg_manager.relations
          @options.add_text([r.summary()])
      when 0
        @options.add_text(@parent.units.msg_manager.relations[@unit].msgs)
      when 1
        @options.add_text(@parent.units.killers())
      when 2
        @options.add_text(@parent.units.find_killer(@name))
  act: ->
  input: (result) ->
    switch(result)
      when "up"
        @options.decrease()
      when "down"
        @options.increase()
      when "select"
        switch(@state)
          when -1
            @state = 0
            @unit = @options.pointer
            this.update()
          when 1
            @state = 2
            @name = @options.options[@options.pointer].name
            this.update()
      when "back"
        @parent.state = -1
      when "previous"
        if @state == 0 || @state == 1
          @state = -1
        else if @state == 2
          @state = 1
        @options.pointer = 0
        this.update()
      when "kills"
        @state = 1
        @options.pointer = 0
        this.update()

  input_info: (@msg) ->
  update_draw: () ->
    switch(@state)
      when -1
        return (summaries: @options.options, pointer: @options.pointer, state: @parent.state, type: 0, kills: @parent.units.kills())
      when 0
        return (log: @options.options, pointer: @options.pointer, state: @parent.state, type: 1)
      when 1
        return (killers: @options.options, pointer: @options.pointer, state: @parent.state, type: 2)
      when 2
        return (name: @name, kills: @options.options, pointer: @options.pointer, state: @parent.state, type: 3)
