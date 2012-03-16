class FloatingMsgs
  constructor: () ->
    @msgs = []
  create: (msg,time,x,y) ->
    x *= 20
    y *= 20
    @msgs.push new FloatText(msg,time,x,y)
  draw: (p5) ->
    for m in @msgs
      p5.text(m,m.x,m.y)
      m.time -= 1