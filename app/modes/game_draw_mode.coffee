class GameDrawMode extends DrawMode
  constructor:(@p5) ->
    @unit_draw = new unitDraw(@p5)
    @map_draw = new mapDraw(@p5,100,100)
    super("game",@p5)
  draw: (object) ->
    switch (object.state)
      when -1
        map = object.map
        units = object.units
        msg = object.msg
        @p5.background(0)
        @map_draw.draw(map)
        @unit_draw.draw(units,map)
        if object.menu != -1
          menuDraw(@p5)
        switch(object.menu)
          when 0
            gameMenuDraw(@p5)
          when 1
            buildMenuDraw(@p5)
        if msg != -1
          messageDraw(@p5,msg)
      when 0
        super(object)

  input: (result) ->
    super(result)
