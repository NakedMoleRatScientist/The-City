class Arm extends Part
  constructor: () ->
    super("Arm")
    @subparts.push new Subpart("lower_arm",3)
    @subparts.push new Subpart("upper_arm",3)
    @subparts.push new Subpart("hand",3)
  arm_interact: (choice) ->
    @subparts(choice).damage = 1
    for part in @subparts
      if part.damage == 0
        return false
    return true
  interact: ->
    super()
    if @subparts[random].type == 3
      #damage pickup and punching
      return {type: 3, damage: 0}