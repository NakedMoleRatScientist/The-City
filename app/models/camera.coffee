class Camera
  constructor: () ->
    @x = 0
    @y = 0
  move: (x, y) ->
    @x += x
    if @x < 0 || @x > 60
      @x -= x
    @y += y
    if @y < 0 || @y > 70
      @y -= y