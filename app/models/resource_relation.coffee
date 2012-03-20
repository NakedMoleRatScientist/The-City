class ResourceRelation extends Relation
  constructor: (@person,@resource) ->
    @type = "resource"
    @summary = @person + " 's acts on resource " + @resource
    super()