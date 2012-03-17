class ResourceRelation extends Relation
  constructor: (@person,@resource) ->
    @summary = @person + " 's acts on resource " + @resource