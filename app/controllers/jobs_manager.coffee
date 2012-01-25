class JobsManager
  constructor: () ->
    @queue = []
  run: (units) ->
    for u in units
      if u.job == null
        u.job = @queue[0]
        @queue = @queue.slice(0,0)
  assign_queue: (@map) ->
    for s in @map.stockpoints
      if s.check_assign() == false
        @queue.push(s)