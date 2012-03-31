class floatText
  constructor: (@msg,@time,@x,@y,@dir) ->
    @pos_x = 0
    @pos_y = 0
  decrease: () ->
    @time -= 1
  change_pos: () ->
    @pos_x += @dir.x
    @pos_y += @dir.y