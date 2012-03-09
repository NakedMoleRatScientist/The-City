class Log
  constructor: (@x,@y) ->
    @name = "log"
  collide: () ->
    true
  action: () ->
    "cut_down"
