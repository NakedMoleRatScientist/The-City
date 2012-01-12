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
        @hand += 1
        if @hand == 2
          return "hand_destroy"
        return "hand"
      when 1
        @leg += 1
        if @leg == 2
          return "leg_destroy"
        return "leg"
  check_combat_ability: () ->
    return true if @hand < 2
    return false