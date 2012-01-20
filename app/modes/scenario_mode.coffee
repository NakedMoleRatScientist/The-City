class ScenarioMode extends Mode
  constructor: ->
    @options = new TextOptions()
    @options.add_text(scenarioList())
    @mode = -1
  act: ->
  input: (result) ->
    switch(result)
      when "up"
        @options.decrease()
      when "down"
        @options.increase()
      when "select"
        @mode = 0
  update_draw: () ->
    return (options: @options.options, pointer: @options.pointer)
  update_mode: (n) ->
    if @mode == -1
      return super(n)
    else
      return (mode: @mode, name: @options.options[@options.pointer])