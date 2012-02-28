class GenerateMap
  constructor: (@map) ->
    @pathfinder = new Pathfinder(@map) ->
