class ScenarioKeyMode extends KeyMode
  constructor: (@p5) ->
  key_pressed: (state) ->
    console.log(@p5.key.code)