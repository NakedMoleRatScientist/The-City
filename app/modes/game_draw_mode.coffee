class GameDrawMode extends DrawMode
  constructor:(@p5) ->
    @dirty_rects = []
    @dirty_menu = -1
    @redraw = false
    @camera = (x: null, y: null)
    @mouse_width = 0
    @floats = new floatsTracker()
    super("game",@p5)
  draw: (object) ->
    switch (object.state)
      when -1
        map = object.map
        units = object.units
        mouse = object.mouse
        msg = object.msg
      #Selective draw
        if determineCameraRedraw(map,@camera) || @redraw == true
          mapDraw(map,p5)
          menuDraw(object.menu,@p5)
          @redraw = false
        drawDirtyRects(@dirty_rects,map,@p5)
        unitsDraw(@p5,units,map)
        determineCollisionRedraw(@p5,@dirty_rects,map)
        menuDraw(object.menu,@p5)
        if @dirty_menu != object.menu
          mapDraw(map,p5)
          menuDraw(object.menu,@p5)
      #Dirty Rects section
        @dirty_rects = []
        for unit in units
          @dirty_rects.push(x: unit.x, y: unit.y)
        @dirty_rects = @dirty_rects.concat(map.redraw)
        map.redraw = []
        x = Math.floor(@p5.mouseX / 20) + map.camera.x
        y = Math.floor(@p5.mouseY / 20) + map.camera.y
        @dirty_rects.push(x: x, y: y)
        if y > 0
          #Add fudge factor to @mouse_width to account for the inaccurate math
          for i in [0..30]
            @dirty_rects.push(x: x + i, y: y - 1) if x + i < 100
        @camera.x = map.camera.x
        @camera.y = map.camera.y
        @dirty_menu = object.menu
      #Draw ALL the time
        @mouse_width = mouseDraw(@p5,object.mouse,units,map)
        frameRateDraw(@p5)
        @floats.process(object.resource_msgs)
        for m in @floats.msgs
          @p5.textFont("monospace",13)
          dirty = drawFloatText(m,@p5)
          if dirty != false
            width = Math.round(dirty.width / 20) + 1 #ugly hack
            height = Math.round(dirty.height / 20) + 1
            x = Math.floor(dirty.x / 20)
            y = Math.floor(dirty.y / 20)
            for w in [0..width]
              for h in [0..height]
                @dirty_rects.push(x: x + w,y: y + h)
        if msg != -1
          messageDraw(@p5,msg)
      else
        @redraw = true
    super(object)

  input: (result) ->
    super(result)