class Log
  constructor: (@x,@y) ->
    @pile = 5
    @name = "log"
  collide: () ->
    true
  acquire: () ->
    @pile -= 1
    return "timber"