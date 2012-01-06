class Arm extends Part
  constructor: () ->
    super("Arm")
    @subparts.push new Subpart("lower_arm",3)
  arm_interact: (choice) ->
    @subparts(choice).damage = 1
    for part in @subparts
      if part.damage == 0
        return false
    return true
  interact: ->
    super()
    if @subparts[random].type == 3
