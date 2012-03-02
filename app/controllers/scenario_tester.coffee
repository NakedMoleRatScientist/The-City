class ScenarioTester
  constructor: (@parent) ->
    @status = true
  input: (result) ->
    if @status == true
      switch(result)
        when "refresh"
          console.log("REFRESH SCENARIO")