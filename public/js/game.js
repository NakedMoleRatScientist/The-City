(function() {
  var mapDraw, menu;
  mapDraw = (function() {
    function mapDraw(width, height) {
      this.width = width;
      this.height = height;
    }
    mapDraw.prototype.draw = function(p5) {
      return p5.rect(0, 0, 100, 100);
    };
    return mapDraw;
  })();
  menu = function(p5) {
    p5.setup = function() {
      p5.size($(window).width(), $(window).height());
      return p5.background(0);
    };
    return p5.draw = function() {};
  };
  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    return processing = new Processing(canvas, menu);
  });
}).call(this);
