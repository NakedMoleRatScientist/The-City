class Body
  constructor: (type) ->
    if type == 1
      @parts = human_body()
  check_death: () ->
    if @parts[0].status == 1 || @parts[5] == 1
      return true
    else
      return false