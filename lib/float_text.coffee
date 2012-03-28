class floatText
  constructor: (@msg,@time,@x,@y,@dir) ->
  decrease: () ->
    @time -= 1
  change_pos: () ->
    @x += @dir.x
    @y += @dir.y