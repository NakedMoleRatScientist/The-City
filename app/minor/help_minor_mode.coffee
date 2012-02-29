class HelpMinorMode
  constructor: (@parent) ->
  act: ->
  input: (result) ->
  update_draw: () ->
    switch(@state)
    when -1
      return (options: @options.options)
