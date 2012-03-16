class Tree
  constructor: (@x,@y) ->
    @name = "tree"
    @cuts_needed = 10
  collide: () ->
    true
  action: () ->
    "cut_down"
  cut: () ->
    @cuts_needed -= 1
    if @cuts_needed == 0
      return true
    false