class TextOptions
  constructor: () ->
    @options = []
    @pointer = 0
    @length = 0
  add_text: (text) ->
    for t in text
      @options.push t
    @length = @options.length
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
  clean: () ->
    @options.clean()
