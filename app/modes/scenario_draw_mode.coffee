class ScenarioDrawMode extends DrawMode
  constructor: (@p5) ->
    @texts = new TextOptionsDraw(@p5,30,12,12)
  draw: (object) ->
  input: (result) ->