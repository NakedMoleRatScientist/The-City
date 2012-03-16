class FloatingMsgs
  constructor: () ->
    @msgs = []
  create: (msg,time,x,y) ->
    @msgs.push new FloatText(msg,time,x,y)