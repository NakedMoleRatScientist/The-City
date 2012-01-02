class Torso extends Part
  constructor: ->
    super
    @subparts.push new Subpart("heart",1)
    @subparts.push new Subpart("left_lung",2)
    @subparts.push new Subpart("right_lung",2)
    @subparts.push new Subpart("throat",3)