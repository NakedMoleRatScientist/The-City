class Mouse
  constructor: () ->
    @mode = 0
    @build = null
    @x = 0
    @y = 0
    #0 is nothing. 1 is build
  map_coord: () ->
    (x: Math.floor(@x / 20), y: Math.floor(@y / 20))
