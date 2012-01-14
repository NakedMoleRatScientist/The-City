class Leg extends Part
  constructor: () ->
    super("Leg")
    @subparts.push new Subpart("lower_leg",3)
    @subparts.push new Subpart("upper_leg",3)
  interact: ->
    part = super()
    if part.type == 3
      #damage walking
      return {type: 2, part: part, damage: 1}
    else
      return {type: 0}
