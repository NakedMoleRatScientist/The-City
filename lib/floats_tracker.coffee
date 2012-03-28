class floatsTracker
  constructor: () ->
    @msgs = []
    @length = 0
  process: (msgs) ->
    if msgs.length > @length
      @length = msgs.length