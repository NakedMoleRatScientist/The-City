class CombatRelation extends Relation
  constructor: (ident) ->
    @one = ident.one
    @two = ident.two
    @type = "combat"
    @summary = @one + " and " + @two + " are engaged in mortal combat!"
    super()
  verify: (ident) ->
    if ident.one == @one && ident.two == @two || ident.one == @two && ident.two == @one
      console.log("BOB")
      return true
    false
