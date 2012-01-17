class Body
  constructor: (type) ->
    if type == 1
      @parts = human_body()
    @death = 0
    @hand = 0 #0 for operational hands. #1 means he only have one hand. #2 means that he lost all his hand functionality
    @leg = 0
  check_death: () ->
    if @death == 1
      return true
    else
      return false
  update_ability: (n) ->

    switch(n)
      when 0
        if @parts[1].disability && @parts[4].disability
          return "hand_destroy"
        else if @parts[1].disability || @parts[4].disability
          return "hand"
      when 1
        if @parts[2].disability && @parts[3].disability
          return "leg_destroy"
        else if @parts[2].disability || @parts[3].disability
          return "leg"
  check_combat_ability: () ->
    return true if @hand < 2
    return false
