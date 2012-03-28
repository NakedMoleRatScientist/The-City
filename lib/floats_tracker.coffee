class floatsTracker
  constructor: () ->
    @msgs = []
    @last = 0
    @size = 0
  process: (msgs) ->
    if msgs != false
      if msgs.length - 1> @last
        @last = msgs.length - 1
        @size = 0
      if msgs[@last].actions.length - 1 > @size
        @size = msgs[@last].actions.length - 1
        msgs[@last].actions.push new floatText(msgs[@last].actions[@size],100,100, "left")
