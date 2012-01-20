class ScenarioMode extends Mode
  constructor: ->
    @scenarios = scenarioList()
    @options = new TextOptions()