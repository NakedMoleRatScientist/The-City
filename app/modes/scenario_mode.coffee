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
        return (change: 0, name: @options.selected())
    return (change: false)
  update_draw: () ->
    return (options: @options.options, pointer: @options.pointer)