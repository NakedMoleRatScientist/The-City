class floatText
  constructor: (@msg,@time,@x,@y,@dir) ->
    @pos_x = 0
    @pos_y = 0
  decrease: () ->
    @time -= 1
  change_pos: () ->
    @x += @dir.x
    @y += @dir.y