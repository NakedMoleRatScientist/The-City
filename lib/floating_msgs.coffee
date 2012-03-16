class FloatingMsgs
  constructor: () ->
    @msgs = []
  create: (msg,time,x,y) ->
    x *= 20
    y *= 20
    @msgs.push new FloatText(msg,time,x,y)
  draw: (p5) ->
    dirty = []
    for m in @msgs
      p5.text(m,m.x,m.y)
      m.x += m.dir.x * 20
      m.y += m.dir.y * 20
      m.time -= 1