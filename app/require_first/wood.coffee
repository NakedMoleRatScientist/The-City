class Wood
  constructor: () ->
    @ident = random_number(1000)
  collide: () ->
    true
  identify: () ->
    @name + @ident
  cut: () ->
    @cuts_needed -= 1
    if @cuts_needed == 0
      return true
    false