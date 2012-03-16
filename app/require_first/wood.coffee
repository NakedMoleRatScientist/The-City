class Wood
  cut: () ->
    @cuts_needed -= 1
    if @cuts_needed == 0
      return true
    false