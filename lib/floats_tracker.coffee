class floatsTracker
  constructor: () ->
    @msgs = []
  process: (msg) ->
    if msg.action == "cut"
      debugger