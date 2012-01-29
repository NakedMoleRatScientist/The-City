class MenuMode extends Mode
  constructor:() ->
    @options = new TextOptions()
    @options.add_text(["New Game", "Test Arena"])
    @mode = -1
    super("menu")
  act:() ->
  input: (result) ->
    switch(result)
      when "up"
        @options.decrease()
      when "down"
        @options.increase()
      when "select"
        if @options.pointer == 0
          return (change: 0)
        else
          return (change: 2)
    return (change: false)

  update_draw: (n) ->
    return (options:  @options.options, pointer: @options.pointer, state: null)