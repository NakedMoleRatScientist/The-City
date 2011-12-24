class Map
  constructor: (width, height) ->
  @map = new Array(height)
  for h in [0..height] when h < height
    @map[h] = new Array(width)
