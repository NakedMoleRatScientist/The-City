class Wood extends Item
  constructor: (@x,@y) ->
    @name = "wood"
    @limit = 5
    super(@x,@y)
