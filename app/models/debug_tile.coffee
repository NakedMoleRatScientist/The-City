class DebugTile
  constructor: (@x,@y) ->
    @name = "debug"
  collide: () ->
    false