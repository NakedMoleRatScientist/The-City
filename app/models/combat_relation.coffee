class CombatRelation extends Relation
  constructor: (ident) ->
    @one = ident.one
    @two = ident.two
    @type = "combat"
    @summary = @one + " and " + @two + " are engaged in mortal combat!"
    super()
  verify: (ident) ->
    if ident.one == @actors[0] && ident.two == @actors[1]
      return true
    false
