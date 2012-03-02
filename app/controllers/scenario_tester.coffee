class ScenarioTester
  constructor: () ->
    @status = false
  input: (result) ->
    if @status == true
      switch(result)
        when "refresh"
          console.log("REFRESH SCENARIO")