class ScenarioTester
  constructor: (@parent) ->
    @status = true
  input: (result) ->
    if @status == true
      switch(result)
        when "undo"
          console.log("REFRESH SCENARIO")