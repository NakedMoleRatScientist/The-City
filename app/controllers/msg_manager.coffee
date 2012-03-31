class MsgManager
  constructor: () ->
    @relations = []
    @last_status = -1
    @combat = new CombatMsgs(this)
  get_list: (type) ->
    list = []
    for r in @relations
      if r.type == type
        list.push(r)
    if list.length == 0
      return false
    list
  create_relation: (identifier,type) ->
    switch(type)
      when "resource"
        @relations.push new ResourceRelation(identifier)
      when "combat"
        @relations.push new CombatRelation(identifier)
    @relations.length - 1
  find_relation: (ident,type) ->
    n = 0
    for r in @relations
      if r.type == type && r.verify(ident)
        return n
      n += 1
    false
  find_or_create_relation: (ident,type) ->
    n = this.find_relation(ident,type)
    if n == false
      return @last_status = this.create_relation(ident,type)
    @last_status = n
    n
  change_priority: (ident,type,i) ->
    n = this.find_or_create_relation(ident,type)
    @relations[n].change_priority(i)
  resource_msg: (msg,ident,action,i = 0) ->
    this.create_msg(ident,"resource",msg)
    this.append_action(ident,"resource",action)
    if i != 0
      this.change_priority(ident,"resource",i)
  append_action: (ident,type,action) ->
    n = this.find_or_create_relation(ident,type)
    @relations[n].push_action(action,ident.x,ident.y)
    n
  create_msg: (ident,type,msg) ->
    n = this.find_or_create_relation(ident,type)
    @relations[n].add_msg(msg)
    n
  get_last_update: () ->
    return -1 if @last_status == -1
    @relations[@last_status].last()
  cut: (object) ->
    msg = object.person + " cuts " + object.resource
    if object.type == "tree"
      this.resource_msg(msg,object,"TIMBER!",1)
    else
      this.resource_msg(msg,object,"chops")
  determine_resource_msg: (object) ->
    return if object == -1
    switch object.action
      when "cut"
        this.cut(object)