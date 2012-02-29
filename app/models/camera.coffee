class Camera
  constructor: () ->
    @x = 0
    @y = 0
  move: (x, y) ->
    @camera_x += x
    if @camera_x < 0 || @camera_x > 60
      @camera_x -= x
    @camera_y += y
    if @camera_y < 0 || @camera_y > 70
      @camera_y -= y