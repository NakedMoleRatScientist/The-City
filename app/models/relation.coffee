class Relation
  constructor: () ->
    @msgs = []
  last: () ->
    @msgs[@msgs.length - 1]
