class Log
  constructor: (@x,@y) ->
    @name = "log"
    @cuts_needed = 2
  collide: () ->
    true
  action: () ->
    "cut_down"
