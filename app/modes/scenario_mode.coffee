class ScenarioMode extends Mode
  constructor: ->
    @options = new TextOptions()
    @options.add_text(scenarioList())
  act: ->
  input: (result) ->
    switch(result)
      when "up"
        @options.decrease()
      when "down"
        @options.increase()
  update_draw: () ->
    return (options: @options.options, pointer: @options.pointer)