(function() {
  var Body, Map, Message, Part, Unit, Units, camera_input, human_body, mapDraw, menu, message_draw, unitDraw;
  Map = (function() {
    function Map(width, height) {
      var h;
      this.camera_x = 0;
      this.camera_y = 0;
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
    Map.prototype.move_camera = function(x, y) {
      this.camera_x += x;
      return this.camera_y += y;
    };
    return Map;
  })();
  Units = (function() {
    function Units() {
      this.units = [];
    }
    Units.prototype.move = function() {
      var unit, _i, _j, _len, _len2, _ref, _ref2, _results;
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        unit = _ref[_i];
        unit.move();
      }
      _ref2 = this.units;
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        unit = _ref2[_j];
        _results.push(unit.attack());
      }
      return _results;
    };
    Units.prototype.clean = function() {
      var unit;
      return this.units = (function() {
        var _i, _len, _ref, _results;
        _ref = this.units;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          unit = _ref[_i];
          if (unit.body.check_death() === false) {
            _results.push(unit);
          }
        }
        return _results;
      }).call(this);
    };
    return Units;
  })();
  Body = (function() {
    function Body(type) {
      if (type === 1) {
        this.parts = human_body();
      }
    }
    Body.prototype.check_death = function() {
      if (this.parts[0].status === 1 || this.parts[5] === 1) {
        return true;
      } else {
        return false;
      }
    };
    return Body;
  })();
  Message = (function() {
    function Message() {
      this.msg = [];
    }
    Message.prototype.update = function(units) {
      var unit, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = units.length; _i < _len; _i++) {
        unit = units[_i];
        _results.push(this.msg = this.msg.concat(unit.get_msg()));
      }
      return _results;
    };
    return Message;
  })();
  message_draw = function(p5, msg) {
    return p5.text(msg, 0, 595);
  };
  human_body = function() {
    var parts;
    parts = [];
    parts.push(new Part("head"));
    parts.push(new Part("hand"));
    parts.push(new Part("foot"));
    parts.push(new Part("foot"));
    parts.push(new Part("hand"));
    parts.push(new Part("heart"));
    return parts;
  };
  Part = (function() {
    function Part(name) {
      this.name = name;
      this.status = 0;
    }
    return Part;
  })();
  Unit = (function() {
    function Unit(x, y, name, type) {
      this.x = x;
      this.y = y;
      this.name = name;
      this.type = type;
      this.goal_x = this.x;
      this.goal_y = this.y;
      this.body = new Body(this.type);
      this.hostility = 0;
      this.alive = 1;
      this.msg = [];
      this.target = null;
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
    Unit.prototype.attack = function() {
      if (this.target === null) {
        return;
      }
      this.goal_x = this.target.x - 1;
      this.goal_y = this.target.y - 1;
      if ((this.target.x + 1) === this.x || (this.target.x - 1) === this.x) {
        if ((this.target.y + 1) === this.y || (this.target.y - 1) === this.y) {
          if ((Math.random() * 10) > 5) {
            this.target.damage(this);
            if (this.target.body.check_death() === true) {
              this.msg.push(this.target.name + " got killed!");
              return this.target = null;
            }
          }
        }
      }
    };
    Unit.prototype.damage = function(unit) {
      var part;
      part = Math.floor(Math.random() * this.body.parts.length);
      this.body.parts[part].status = 1;
      return this.msg.push(unit.name + " destroys the " + this.body.parts[part].name + " of " + this.name);
    };
    Unit.prototype.get_msg = function() {
      var msg;
      msg = this.msg;
      this.msg = [];
      return msg;
    };
    return Unit;
  })();
  mapDraw = (function() {
    function mapDraw(width, height) {
      this.width = width;
      this.height = height;
    }
    mapDraw.prototype.draw = function(p5, map) {
      var height, results, width, _ref, _results;
      results = map.map;
      p5.stroke(255);
      _results = [];
      for (height = 0, _ref = this.height; 0 <= _ref ? height <= _ref : height >= _ref; 0 <= _ref ? height++ : height--) {
        if (height < this.height) {
          _results.push((function() {
            var _ref2, _results2;
            _results2 = [];
            for (width = 0, _ref2 = this.width; 0 <= _ref2 ? width <= _ref2 : width >= _ref2; 0 <= _ref2 ? width++ : width--) {
              if (width < this.width) {
                if (results[height][width] === 1) {
                  p5.noFill();
                } else {
                  p5.fill();
                }
                _results2.push(p5.rect(20 * (width + map.camera_x), 20 * (height + map.camera_y), 20, 20));
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
    function unitDraw(p5, units, map) {
      this.p5 = p5;
      this.units = units;
      this.map = map;
    }
    unitDraw.prototype.draw = function(p5, units, map) {
      var unit, _i, _len, _ref, _results;
      _ref = this.units.units;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        unit = _ref[_i];
        _results.push(this.draw_unit(unit));
      }
      return _results;
    };
    unitDraw.prototype.draw_unit = function(unit) {
      this.p5.fill();
      if (unit.type === 1) {
        this.p5.fill(255, 69, 0);
        return this.p5.text("H", (unit.x + this.map.camera_x) * 20 + 5, (unit.y + this.map.camera_y) * 20 - 5);
      }
    };
    return unitDraw;
  })();
  camera_input = function(key, map) {
    console.log(key.code);
    if (key.code === 97) {
      return map.move_camera(-1, 0);
    } else if (key.code === 100) {
      return map.move_camera(1, 0);
    } else if (key.code === 115) {
      return map.move_camera(0, -1);
    } else if (key.code === 119) {
      return map.move_camera(0, 1);
    }
  };
  menu = function(p5) {
    p5.setup = function() {
      p5.size(800, 600);
      p5.frameRate(50);
      p5.background(0);
      this.map = new Map(100, 100);
      this.map.generate();
      this.units = new Units();
      this.units.units.push(new Unit(10, 10, "Miya", 1));
      this.units.units.push(new Unit(10, 20, "John", 1));
      this.units.units[1].hostility = 1;
      this.units.units[0].target = this.units.units[1];
      this.unit_draw = new unitDraw(p5, this.units, this.map);
      return this.message = new Message();
    };
    p5.keyPressed = function() {
      return camera_input(p5.key, this.map);
    };
    p5.logic = function() {
      this.units.move();
      this.message.update(this.units.units);
      return this.units.clean();
    };
    return p5.draw = function() {
      var map_draw;
      p5.background(0);
      map_draw = new mapDraw(100, 100);
      map_draw.draw(p5, this.map);
      this.unit_draw.draw();
      message_draw(p5, this.message.msg[this.message.msg.length - 1]);
      return p5.logic();
    };
  };
  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    return processing = new Processing(canvas, menu);
  });
}).call(this);
