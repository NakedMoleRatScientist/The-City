class Crystal extends Item
  constructor: (@x,@y) ->
    @name = "crystal"
    @limit = 50
    super(@x,@y)