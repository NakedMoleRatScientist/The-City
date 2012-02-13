class GameDrawMode extends DrawMode
  constructor:(@p5) ->
    @dirty_rects = []
    @dirty_menu = -1
    @camera = (x: null, y: null)
    super("game",@p5)
  draw: (object) ->
    switch (object.state)
      when -1
        map = object.map
        determineCameraRedraw(map,@camera,@p5)
        drawDirtyRects(@dirty_rects,map,@p5)
        units = object.units
        msg = object.msg
        changeMenuDraw(object.menu,@dirty_menu,map,@p5)
        unitDraw(@p5,units,map)
        if msg != -1
          messageDraw(@p5,msg)
        mouseDraw(@p5,object.mouse,map.camera_x,map.camera_y)
        @dirty_rects = []
        for unit in units
          @dirty_rects.push(x: unit.x, y: unit.y)
        @dirty_rects.push(x: mouse.x, mouse.y)
        @camera.x = map.camera_x
        @camera.y = map.camera_y
        @dirty_menu = object.menu
      when 0
        super(object)

  input: (result) ->
    super(result)
