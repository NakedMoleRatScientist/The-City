class Head extends Part
  constructor: ->
    super("Head")
    @subparts.push new Subpart("left_eye",0)
    @subparts.push new Subpart("right_eye",0)
    @subparts.push new Subpart("nose",0)
    @subparts.push new Subpart("skull",1)
  interact: ->
    super()
    if @subparts[random].type == 1
      return 1
    else
      return 0