class Arm extends Part
  constructor: () ->
    super("Arm")
    @subparts.push new Subpart("lower_arm",3)
    @subparts.push new Subpart("upper_arm",3)
    @subparts.push new Subpart("hand",3)
    @disabled = 0
  interact: ->
    part = super()
    if part.type == 3
      part.damage = 1
      #damage pickup and punching
      @disabled = 1
      return {type: 2, part: part.name, damage: 0}
    else
      return {type: 0}
