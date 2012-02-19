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
        units = object.units
        mouse = object.mouse
        msg = object.msg
      #Selective draw
        if determineCameraRedraw(map,@camera)
          mapDraw(map,p5)
          menuDraw(object.menu,@p5)
        drawDirtyRects(@dirty_rects,map,@p5)
        unitDraw(@p5,units,map)
        if determineCollisionRedraw(@dirty_rects,map)
          menuDraw(object.menu,@p5)
        if @dirty_menu != object.menu
          mapDraw(map,p5)
          menuDraw(object.menu,@p5)
      #Dirty Rects section
        @dirty_rects = []
        for unit in units
          @dirty_rects.push(x: unit.x, y: unit.y)
        if mouse.mode == 1
          x = Math.floor(@p5.mouseX / 20) + map.camera_x
          y = Math.floor(@p5.mouseY / 20) + map.camera_y
          @dirty_rects.push(x: x, y: y)
          @dirty_rects.push(x: x, y: y - 1)
          @dirty_rects.push(x: x + 1, y: y - 1)
          @dirty_rects.push(x: x + 2, y: y - 1)
          @dirty_rects.push(x: x + 3, y: y - 1)
        @camera.x = map.camera_x
        @camera.y = map.camera_y
        @dirty_menu = object.menu
      #Draw ALL the time
        mouseDraw(@p5,object.mouse,map.camera_x,map.camera_y)
        frameRateDraw(@p5)
        messageDraw(@p5,msg)

      when 0
        @redraw = true
        super(object)

  input: (result) ->
    super(result)
