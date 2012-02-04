class Unit
  constructor: (@x,@y,@type) ->
    @body = new Body(@type)