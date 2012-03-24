class floatsTracker
  constructor: () ->
    @msgs = []
  process: (msgs) ->
    if msgs != false
      console.log(msgs[0].last_action())
