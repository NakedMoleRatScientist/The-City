class ResourceRelation extends Relation
  constructor: (ident) ->
    @person = ident.person
    @resource = ident.resource
    @type = "resource"
    @summary = @person + " 's acts on resource " + @resource
    super()
  verify: (ident) ->
    return true if ident.person = @person && ident.resource == @resource
    false
