(function() {
  var Map, Unit, mapDraw, menu, unitDraw;
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
    Map.prototype.generate = function() {
      var h, w, _ref, _results;
      _results = [];
      for (h = 0, _ref = this.map.length; 0 <= _ref ? h <= _ref : h >= _ref; 0 <= _ref ? h++ : h--) {
        if (h < this.map.length) {
          _results.push((function() {
            var _ref2, _results2;
            _results2 = [];
            for (w = 0, _ref2 = this.map[h].length; 0 <= _ref2 ? w <= _ref2 : w >= _ref2; 0 <= _ref2 ? w++ : w--) {
              if (w < this.map[h].length) {
                _results2.push((Math.random() * 10) > 5 ? this.map[h][w] = 1 : this.map[h][w] = 0);
              }
            }
            return _results2;
          }).call(this));
        }
      }
      return _results;
    };
    Map.prototype.result = function() {
      return this.map;
    };
    return Map;
  })();
  Unit = (function() {
    function Unit(x, y, name, type) {
      this.x = x;
      this.y = y;
      this.name = name;
      this.type = type;
      this.goal_x = this.x;
      this.goal_y = this.y;
    }
    Unit.prototype.set_move = function(x, y) {
      this.goal_x = x;
      return this.goal_y = y;
    };
    Unit.prototype.move = function() {
      if ((this.x - this.goal_x) < 0) {
        this.x = this.x + 1;
        return;
      } else if ((this.x - this.goal_x) > 0) {
        this.x = this.x - 1;
        return;
      }
      if ((this.y - this.goal_y) < 0) {
        this.y = this.y + 1;
      } else if ((this.y - this.goal_y) > 0) {
        this.y = this.y - 1;
      }
    };
    return Unit;
  })();
  mapDraw = (function() {
    function mapDraw(width, height) {
      this.width = width;
      this.height = height;
    }
    mapDraw.prototype.draw = function(p5, map) {
      var height, width, _ref, _results;
      p5.stroke(255);
      _results = [];
      for (height = 0, _ref = this.height; 0 <= _ref ? height <= _ref : height >= _ref; 0 <= _ref ? height++ : height--) {
        if (height < this.height) {
          _results.push((function() {
            var _ref2, _results2;
            _results2 = [];
            for (width = 0, _ref2 = this.width; 0 <= _ref2 ? width <= _ref2 : width >= _ref2; 0 <= _ref2 ? width++ : width--) {
              if (width < this.width) {
                if (map[height][width] === 1) {
                  p5.noFill();
                } else {
                  p5.fill();
                }
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
  unitDraw = (function() {
    function unitDraw() {}
    unitDraw.prototype.draw = function(p5, unit) {
      p5.fill();
      if (unit.type === 1) {
        p5.fill(255, 69, 0);
        return p5.text("H", unit.x * 20 + 5, unit.y * 20 - 5);
      }
    };
    return unitDraw;
  })();
  menu = function(p5) {
    p5.setup = function() {
      p5.size($(window).width(), $(window).height());
      p5.frameRate(50);
      p5.background(0);
      this.map = new Map(100, 100);
      this.map.generate();
      this.unit = new Unit(10, 10, "Miya", 1);
      return this.unit.set_move(20, 1);
    };
    p5.logic = function() {
      return this.unit.move();
    };
    return p5.draw = function() {
      var map_draw, unit_draw;
      p5.background(0);
      map_draw = new mapDraw(100, 100);
      map_draw.draw(p5, this.map.result());
      unit_draw = new unitDraw();
      unit_draw.draw(p5, this.unit);
      return p5.logic();
    };
  };
  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    return processing = new Processing(canvas, menu);
  });
}).call(this);
