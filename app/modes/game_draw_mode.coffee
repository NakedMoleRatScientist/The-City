class GameDrawMode extends DrawMode
  constructor:(@p5) ->
    @dirty_rects = []
    @dirty_menu = -1
    @redraw = false
    @camera = (x: null, y: null)
    super("game",@p5)
  draw: (object) ->
    switch (object.state)
      when -1
        map = object.map
        if @redraw == true
          mapDraw(map,p5)
          @redraw = false
        if determineCameraRedraw(map,@camera)
          mapDraw(map,p5)
          menuDraw(object.menu,@p5)
        drawDirtyRects(@dirty_rects,map,@p5)
        units = object.units
        mouse = object.mouse
        msg = object.msg
        frameRateDraw(@p5)
        if determineCollisionRedraw(@dirty_rects)
          menuDraw(object.menu,@p5)
        if @dirty_menu != object.menu
          mapDraw(map,p5)
          menuDraw(object.menu,@p5)
        unitDraw(@p5,units,map)
        if msg != -1
          messageDraw(@p5,msg)
        mouseDraw(@p5,object.mouse,map.camera_x,map.camera_y)
        @dirty_rects = []
        for unit in units
          @dirty_rects.push(x: unit.x, y: unit.y)
        if mouse.mode == 1
          x = Math.floor(@p5.mouseX / 20)
          y = Math.floor(@p5.mouseY / 20)
          @dirty_rects.push(x: x, y: y)
          @dirty_rects.push(x: x, y: y - 1)
          @dirty_rects.push(x: x + 1, y: y - 1)
          @dirty_rects.push(x: x + 2, y: y - 1)
          @dirty_rects.push(x: x + 3, y: y - 1)
        @camera.x = map.camera_x
        @camera.y = map.camera_y
        @dirty_menu = object.menu
      when 0
        @redraw = true
        super(object)

  input: (result) ->
    super(result)
