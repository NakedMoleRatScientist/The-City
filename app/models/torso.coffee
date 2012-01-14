class Torso extends Part
  constructor: ->
    super("Torso")
    @subparts.push new Subpart("heart",1)
    @subparts.push new Subpart("left_lung",2)
    @subparts.push new Subpart("right_lung",2)
  lung_damage: (choice) ->
    @subparts[choice].damage = 1
    if @subparts[1].damage == 1 && @subparts[2].damage == 1
      return true
    return false
  #0 means nothing happens.
  #1 is death
  interact: ->
    part = super()
    if part.type == 2
      return {type: 1, part: part.name, cause: "asphyxia"} if this.lung_damage(@random)
      return {type: 0, part: part.name}
    else if part.type == 1
      part.damage = 1
      return {type: 1, part: part.name, cause: "heart failure"}
    else
      return {type: 0}
