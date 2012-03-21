class Stone extends Item
  constructor: (@x,@y) ->
    @name = "stone"
    @limit = 1
    super(@x,@y)