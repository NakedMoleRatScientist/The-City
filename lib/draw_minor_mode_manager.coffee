class DrawMinorModeManager
  constructor: (name,mode,p5)
    @modes = initializeDrawMinorModes(name,mode,p5)
  draw: (n)
    @modes[n].draw()
