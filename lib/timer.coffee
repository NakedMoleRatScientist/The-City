class Timer
  constructor: () ->
    var event = setInterval(this.act,1000)
  act: () ->
