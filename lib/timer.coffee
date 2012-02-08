class Timer
  constructor: () ->
    var event = setInterval(this.act,1000)
    @seconds = 0
  act: () ->
    @seconds += 1
