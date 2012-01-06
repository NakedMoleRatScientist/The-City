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
  #1 is to die of heart failure.
  #2 is to die of Asphyxia
  interact: ->
    super()
    if @subparts[random].type == 2
      return {type: 2, msg: "Asphyxia"} if this.lung_damage(random)
    else if @subparts[random].type == 1
      @subparts[random].damage = 1
      return 1
    else
      return 0
