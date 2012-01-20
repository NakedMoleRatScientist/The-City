class ScenarioMode extends Mode
  constructor: ->
    @options = new TextOptions()
    @options.add_text(scenarioList())
  act: ->
  input: (result) ->
  update_draw: () ->
    return (options: @options.options, pointer: @options.pointer)