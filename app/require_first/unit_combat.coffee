class unitCombat
  constructor: (@unit) ->
  auto_detect_target: (units) ->
    if @target == null && @hostility == 0
      list = units.hostile_filter(1)
      if list.length == 0
        return
      @target = list[random_number(list.length)]
