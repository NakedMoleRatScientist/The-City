class floatsTracker
  constructor: () ->
    @msgs = []
    @last = 0
    @size = 0
  process: (msgs) ->
    if msgs.length - 1> @last
      @last = msgs.length - 1
