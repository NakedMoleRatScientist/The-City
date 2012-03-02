class Part
  constructor: (@name) ->
    @subparts = []
  interact: ->
    @random = Math.floor(Math.random() * @subparts.length)
    @subparts[@random]
