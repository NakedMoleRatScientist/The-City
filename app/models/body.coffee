class Body
  constructor: (type) ->
    if type == 1
      @parts = human_body()
    @death = 0
  check_death: () ->
    if @death == 1
      return true
    else
      return false