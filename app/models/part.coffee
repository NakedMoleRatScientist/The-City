class Part
  constructor: (@name) ->
    @subparts = []
    if @name == "torso"
      @subparts.push new Subpart("heart",1)
      @subparts.push new Subpart("lung",2)
      @subparts.push new Subpart("lung",2)
      @subparts.push new Subpart("throat",3)
      @subparts.push new Subpart("spine_top",1)
