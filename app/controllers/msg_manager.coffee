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
  resource_msg: (msg,ident,action) ->
    this.create_msg(ident,"resource",msg)
    this.append_action(ident,"resource",action)
  append_action: (ident,type,action) ->
    n = this.find_or_create_relation(ident,type)
    @relations[n].push_action(action)
    n
  create_msg: (ident,type,msg) ->
    n = this.find_or_create_relation(ident,type)
    @relations[n].add_msg(msg)
    n
  combat_msg: (unit_one,unit_two,msg) ->
    ident = (one: unit_one, two: unit_two)
    this.create_msg(ident,"combat",msg)
  get_last_update: () ->
    return -1 if @last_status == -1
    @relations[@last_status].last()
  combat_death: (object) ->
    return if object == false
    switch(object.action)
      when "killed"
        msg = object.actors[0] + " " + object.action + " " + object.actors[1]
      when "escaped"
        msg = object.actors[1] + " " + object.action + " from the grasp of " + object.actors[0]
    this.combat_msg(object.actors[0],object.actors[1],msg)
  dodge: (object) ->
    if object.ability == false
      msg = object.actors[0] + " can't dodge!"
    else
      msg = object.actors[0] + " dodges " + object.actors[1] + "'s strike"
    this.combat_msg(object.actors[0],object.actors[1],msg)
  determine_combat_msg: (objects) ->
    return if objects == -1
    for o in objects
      switch(o.action)
        when "strike"
          @combat.strike(o)
        when "dodge"
          this.dodge(o)
  cut: (object) ->
    msg = object.person + " cuts " + object.resource
    this.resource_msg(msg,object,"chops")
  determine_resource_msg: (object) ->
    return if object == -1
    switch object.action
      when "cut"
        this.cut(object)