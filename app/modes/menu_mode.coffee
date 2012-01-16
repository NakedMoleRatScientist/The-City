class MenuMode
  constructor:() ->
    @options = new TextOptions()
    @options.add_text(["New Game", "Test Arena"])
  act:() ->
  input: (result) ->
    switch(result)
      when "up"
        @options.decrease()
      when "down"
        @options.increase()

  update_draw: (n) ->
    return (options:  @options.options, pointer: @options.pointer)
