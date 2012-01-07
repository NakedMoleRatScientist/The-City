class Leg extends Part
  constructor: () ->
    super("Leg")
    @subparts.push new Subpart("lower_leg",3)
    @subparts.push new Subpart("upper_leg",3)
  arm_interact: (choice) ->
    @subparts(choice).damage = 1
    for part in @subparts
      if part.damage == 0
        return false
    return true
  interact: ->
    super()
    if @subparts[@random].type == 3
      #damage walking
      return {type: 2, damage: 1}
    else
      return {type: 0}