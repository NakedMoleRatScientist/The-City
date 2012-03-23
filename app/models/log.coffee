class Log extends Wood
  constructor: (@x,@y,@dir) ->
    @name = "log"
    @cuts_needed = 2
    @part = "middle"
    super()
