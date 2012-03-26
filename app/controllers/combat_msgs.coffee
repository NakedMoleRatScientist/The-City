class CombatMsgs
  constructor: (@manager) ->
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
      @manager.combat_msg(object.actors[0],object.actors[1],m)
  dodge: (object) ->
    if object.ability == false
      msg = object.actors[0] + " can't dodge!"
    else
      msg = object.actors[0] + " dodges " + object.actors[1] + "'s strike"
    @manager.combat_msg(object.actors[0],object.actors[1],msg)
