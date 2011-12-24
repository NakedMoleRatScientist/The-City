(function() {
  var Map, mapDraw, menu;
  Map = (function() {
    function Map(width, height) {
      var h;
      this.map = new Array(height);
      for (h = 0; 0 <= height ? h <= height : h >= height; 0 <= height ? h++ : h--) {
        if (h < height) {
          this.map[h] = new Array(width);
        }
      }
    }
    return Map;
  })();
  mapDraw = (function() {
    function mapDraw(width, height) {
      this.width = width;
      this.height = height;
    }
    mapDraw.prototype.draw = function(p5) {
      var height, width, _ref, _results;
      p5.noFill();
      p5.stroke(255);
      _results = [];
      for (height = 0, _ref = this.height; 0 <= _ref ? height <= _ref : height >= _ref; 0 <= _ref ? height++ : height--) {
        if (height < this.height) {
          _results.push((function() {
            var _ref2, _results2;
            _results2 = [];
            for (width = 0, _ref2 = this.width; 0 <= _ref2 ? width <= _ref2 : width >= _ref2; 0 <= _ref2 ? width++ : width--) {
              if (width < this.width) {
                _results2.push(p5.rect(20 * width, 20 * height, 20, 20));
              }
            }
            return _results2;
          }).call(this));
        }
      }
      return _results;
    };
    return mapDraw;
  })();
  menu = function(p5) {
    p5.setup = function() {
      p5.size($(window).width(), $(window).height());
      p5.frameRate(50);
      return p5.background(0);
    };
    return p5.draw = function() {
      var map;
      map = new mapDraw(100, 100);
      return map.draw(p5);
    };
  };
  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    return processing = new Processing(canvas, menu);
  });
}).call(this);
