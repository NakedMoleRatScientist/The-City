class Part
  constructor: (@name) ->
    @subparts = []
  interact: ->
    @random = Math.round(Math.random() * (@subparts.length - 1))
