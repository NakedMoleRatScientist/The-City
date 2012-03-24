class MsgManager
  constructor: () ->
    @relations = []
    @last_status = -1
  get_list: (type) ->
    list = []
    for r in @relations
      if r.type == type
        list.push(r)
    list
  create_relation: (identifier,type) ->
    switch(type)
      when "tree"
        @relations.push new ResourceRelation(identifier)
      when "combat"
        @relations.push new CombatRelation(identifier)
    @relations.length - 1
  find_relation: (identifier,type) ->
    n = 0
    for r in @relations
      if r.type == type && r.verify(identifier)
        return n
      n += 1
    false
  find_or_create_relation: (ident,type) ->
    n = this.find_relation(ident,type)
    if n == false
      return this.create_relation(ident,type)
    @last_status = n
    n
  resource_msg: (msg,person,resource,action) ->
    ident = (person: person, resource: resource)
    this.create_msg(ident,"tree",msg)
    this.append_action(ident,"tree",action)
  append_action: (ident,type,action)
    n = this.find_or_create_relation(ident,type)
    @relations[n].actions.push(action)
    @last_status = n
    n
  create_msg: (ident,type,msg) ->
    n = this.find_or_create_relation(ident,type)
    @relations[n].add_msg(msg)
    @last_status = n
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
          this.strike(o)
        when "dodge"
          this.dodge(o)
  cut: (object) ->
    msg = object.person + " cuts " + object.resource
    this.resource_msg(msg,object.person,object.resource,"cut")
  determine_resource_msg: (object) ->
    return if object == -1
    switch object.action
      when "cut"
        this.cut(object)
  strike: (object) ->
    part = object.part
    msgs = []
    attack_msg = object.actors[0] + " strikes!"
    msgs.push(attack_msg)
    damage_msg = object.actors[1] + "'s " + part + " suffers damage!"
    switch(object.type)
      when 0
        msgs.push(damage_msg)
      when 1
        msgs.push(damage_msg)
        msgs.push(object.actors[1] + " dies of " + object.cause)
      when 2
        msgs.push(damage_msg)
      when 3
        msgs.push(object.actors[1] + "'s " + part + " was protected by his " + object.protect)
    switch(object.special)
      when 0
        msgs.push(object.actors[1] + " losts some hand functionality")
      when 1
        msgs.push(object.actors[1] + " suffers hand disability")
      when 2
        msgs.push(object.actors[1] + " losts some leg functionality")
      when 3
        msgs.push(object.actors[1] + " losts all leg functionality")
    for m in msgs
      this.combat_msg(object.actors[0],object.actors[1],m)
