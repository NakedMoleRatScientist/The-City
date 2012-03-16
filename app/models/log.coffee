class Log extends Wood
  constructor: (@x,@y) ->
    @name = "log"
    @cuts_needed = 2
  action: () ->
    "cut_down"
