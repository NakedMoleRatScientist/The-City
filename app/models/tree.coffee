class Tree extends Wood
  constructor: (@x,@y) ->
    @name = "tree"
    @cuts_needed = 10
    @dir = "none"
    super()
  dir_output: () ->
    switch(@dir)
      when "left"
        x = -1
        y = 0
      when "right"
        x = 1
        y = 0
      when "down"
        x = 0
        y = 1
      when "up"
        x = 0
        y = -1
    return (x: x, y: y)
