class Wood
  collide: () ->
    true
  identify: () ->
    @name + @identl
  cut: () ->
    @cuts_needed -= 1
    if @cuts_needed == 0
      return true
    false