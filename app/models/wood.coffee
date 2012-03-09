class Timber extends Item
  constructor: (@x,@y) ->
    @name = "timber"
    @limit = 1
    super(@x,@y)
