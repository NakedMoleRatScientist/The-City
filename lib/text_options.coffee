class TextOptions
  constructor: () ->
    @options = []
    @pointer = 0
    @length = 0
  increase: () ->
    if @pointer < @length
      @pointer += 1
    else
      @pointer = 0
  decrease: () ->
    if @pointer == 0
      @pointer = @length
    else
      @pointer -= 1
