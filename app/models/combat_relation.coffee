class CombatRelation extends Relation
  constructor: (@actors) ->
    @summary = @actors[0] + " and " + @actors[1] + " are engaged in mortal combat!"
    super()
