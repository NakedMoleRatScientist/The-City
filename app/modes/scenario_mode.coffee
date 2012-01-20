class ScenarioMode extends Mode
  constructor: ->
    @options = new TextOptions()
    @options.add_text(scenarioList())