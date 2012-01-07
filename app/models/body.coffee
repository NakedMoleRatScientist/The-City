class Body
  constructor: (type) ->
    if type == 1
      @parts = human_body()
    @death = 0
    @hand = 0 #0 for operational hands. #1 is for disabled hands
  check_death: () ->
    if @death == 1
      return true
    else
      return false