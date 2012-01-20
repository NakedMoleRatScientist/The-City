class MenuMode extends Mode
  constructor:() ->
    @options = new TextOptions()
    @options.add_text(["New Game", "Test Arena"])
    @mode = -1
  act:() ->
  input: (result) ->
    switch(result)
      when "up"
        @options.decrease()
      when "down"
        @options.increase()
      when "return"
        if @options.pointer == 0
          @mode = 0
        else
          @mode = 2

  update_draw: (n) ->
    return (options:  @options.options, pointer: @options.pointer)
