class JobsManager
  constructor: () ->
    @queue = []
  run: () ->
  assign_queue: (@map) ->
    for s in @map.stockpoints
      if s.check_assign() == false
        @queue.push(s)