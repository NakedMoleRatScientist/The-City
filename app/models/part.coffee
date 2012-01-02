class Part
  constructor: (@name) ->
    @subparts = []
    if @name == "torso"
      @subparts.push new Subpart("heart",1)
      @subparts.push new Subpart("lung",2)
