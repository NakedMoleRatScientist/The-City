class Message
  constructor: () ->
   @msg = []
  update: (units) ->
   @msg.join(unit.get_msg()) for unit in units
