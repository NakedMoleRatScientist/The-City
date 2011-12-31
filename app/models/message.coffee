class Message
  constructor: () ->
   @msg = []
  update: (units) ->
   @msg = @msg.concat(unit.get_msg()) for unit in units