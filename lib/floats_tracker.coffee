class floatsTracker
  constructor: () ->
    @msgs = []
    @last = 0
    @size = 0
  process: (msgs) ->
    if msgs.length > @last
      @last = msgs.length
