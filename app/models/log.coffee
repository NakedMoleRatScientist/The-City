class Log
  constructor: (@x,@y) ->
    @pile = 1
    @name = "log"
  collide: () ->
    true
  acquire: () ->
    @pile -= 1
    return "timber"