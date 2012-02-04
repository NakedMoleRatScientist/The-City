class Unit
  constructor: (@x,@y,@type,@name) ->
    @body = new Body(@type)