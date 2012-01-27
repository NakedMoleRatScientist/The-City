class JobsManager
  constructor: (@map) ->
    @queue = []
  run: (units) ->
    return -1 if @queue.length == 0
    for u in units
      if u.job == null
        u.job = @queue[0]
        @queue = @queue.slice(0,0)
  assign_queue: () ->
    for s in @map.stockpoints
      if s.check_assign() == false
        @queue.push(s)