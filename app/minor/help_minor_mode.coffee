class HelpMinorMode
  constructor: (@parent) ->
  act: ->
  input: (result) ->
    switch(result)
      when "back"
        @parent.state = -1
  update_draw: () ->
    return (state: 0)
