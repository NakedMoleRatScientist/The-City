class Talk
  constructor: (@info) ->
  msg: (text) ->
   @info.push(text)
  clean: () ->
    @info = []