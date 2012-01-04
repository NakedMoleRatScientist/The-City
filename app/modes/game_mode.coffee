class GameMode
 constructor: ->
  @map = new Map(100,100)
  @map.generate()
  @units = new Units()
  @units.units.push new Unit(10,10, "Miya",1)
  @units.units.push new Unit(10,20, "John",1)
  @units.units[1].hostility = 1
  @units.units[0].target = @units.units[1]
  @message = new Message()