(function() {
  var Arm, Body, GameMode, GameModeDraw, GameModeKey, Head, Leg, Map, MenuMode, MenuModeDraw, MenuModeKey, Message, Mode, ModeDraw, ModeKey, Part, RadioButton, Subpart, Talk, TextOptions, Torso, Unit, Units, changeMode, circle_collision, human_body, list, listDraw, listKey, mapDraw, menu, message_draw, titleDraw, unitDraw;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  GameMode = (function() {
    function GameMode() {
      this.map = new Map(100, 100);
      this.map.generate();
      this.units = new Units();
      this.units.units.push(new Unit(10, 10, "Miya", 1));
      this.units.units.push(new Unit(10, 20, "John", 1));
      this.units.units[1].hostility = 1;
      this.units.units[0].target = this.units.units[1];
      this.message = new Message();
    }
    GameMode.prototype.act = function() {
      this.units.move();
      this.message.update(this.units.units);
      return this.units.clean();
    };
    GameMode.prototype.input = function(result) {
      switch (result) {
        case "up":
          return this.map.move_camera(0, -1);
        case "down":
          return this.map.move_camera(0, 1);
        case "left":
          return this.map.move_camera(-1, 0);
        case "right":
          return this.map.move_camera(1, 0);
      }
    };
    GameMode.prototype.update_draw = function() {
      return {
        units: this.units,
        map: this.map
      };
    };
    return GameMode;
  })();
  GameModeDraw = (function() {
    function GameModeDraw(p5) {
      this.p5 = p5;
      this.unit_draw = new unitDraw(this.p5);
      this.map_draw = new mapDraw(this.p5, 100, 100);
    }
    GameModeDraw.prototype.draw = function(object) {
      var map, units;
      map = object.map;
      units = object.units;
      this.p5.background(0);
      this.map_draw.draw(map);
      return this.unit_draw.draw(units, map);
    };
    GameModeDraw.prototype.input = function() {};
    return GameModeDraw;
  })();
  GameModeKey = (function() {
    function GameModeKey() {}
    GameModeKey.prototype.key_pressed = function(key) {
      if (key.code === 97) {
        return "right";
      } else if (key.code === 100) {
        return "left";
      } else if (key.code === 115) {
        return "up";
      } else if (key.code === 119) {
        return "down";
      }
    };
    return GameModeKey;
  })();
  list = function() {
    return [new GameMode(), new MenuMode()];
  };
  listDraw = function(p5) {
    return [new GameModeDraw(p5), new MenuModeDraw(p5)];
  };
  listKey = function() {
    return [new GameModeKey(), new MenuModeKey()];
  };
  MenuMode = (function() {
    function MenuMode() {}
    MenuMode.prototype.act = function() {};
    MenuMode.prototype.input = function(result) {};
    MenuMode.prototype.update_draw = function() {};
    return MenuMode;
  })();
  MenuModeDraw = (function() {
    function MenuModeDraw(p5) {
      this.p5 = p5;
      this.texts = new TextOptions(this.p5, 250, 250, 18);
      this.texts.add("New Game");
      this.texts.add("Test Arena");
    }
    MenuModeDraw.prototype.draw = function() {
      this.p5.background(0);
      titleDraw(this.p5);
      return this.texts.draw();
    };
    MenuModeDraw.prototype.input = function(result) {
      if (result === "down") {
        return this.texts.increase();
      } else if (result === "up") {
        return this.texts.decrease();
      }
    };
    return MenuModeDraw;
  })();
  MenuModeKey = (function() {
    function MenuModeKey() {}
    MenuModeKey.prototype.key_pressed = function(key) {
      console.log(key.code);
      if (key.code === 115) {
        return "down";
      } else if (key.code === 119) {
        return "up";
      } else if (key.code === 10) {
        return "game_mode";
      } else {
        return false;
      }
    };
    return MenuModeKey;
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
  Arm = (function() {
    __extends(Arm, Part);
    function Arm() {
      Arm.__super__.constructor.call(this, "Arm");
      this.subparts.push(new Subpart("lower_arm", 3));
      this.subparts.push(new Subpart("upper_arm", 3));
      this.subparts.push(new Subpart("hand", 3));
    }
    Arm.prototype.arm_interact = function(choice) {
      var part, _i, _len, _ref;
      this.subparts[choice].damage = 1;
      _ref = this.subparts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        if (part.damage === 0) {
          return false;
        }
      }
      return true;
    };
    Arm.prototype.interact = function() {
      Arm.__super__.interact.call(this);
      if (this.subparts[random].type === 3) {
        this.arm_interact(random);
        return {
          type: 2,
          damage: 0
        };
      }
    };
    return Arm;
  })();
  Body = (function() {
    function Body(type) {
      if (type === 1) {
        this.parts = human_body();
      }
      this.death = 0;
      this.hand = 0;
    }
    Body.prototype.check_death = function() {
      if (this.death === 1) {
        return true;
      } else {
        return false;
      }
    };
    Body.prototype.update_ability = function(n) {
      if (n === 0) {
        this.hand += 1;
        if (this.hand === 2) {
          return "hand_destroy";
        }
        return "hand";
      }
    };
    return Body;
  })();
  Head = (function() {
    __extends(Head, Part);
    function Head() {
      Head.__super__.constructor.call(this, "Head");
      this.subparts.push(new Subpart("left_eye", 0));
      this.subparts.push(new Subpart("right_eye", 0));
      this.subparts.push(new Subpart("nose", 0));
      this.subparts.push(new Subpart("skull", 1));
    }
    Head.prototype.interact = function() {
      Head.__super__.interact.call(this);
      if (this.subparts[random].type === 1) {
        return {
          type: 1,
          msg: "skull cavein"
        };
      } else {
        return {
          type: 0
        };
      }
    };
    return Head;
  })();
  human_body = function() {
    var parts;
    parts = [];
    parts.push(new Head());
    parts.push(new Arm());
    parts.push(new Leg());
    parts.push(new Leg());
    parts.push(new Arm());
    parts.push(new Torso());
    return parts;
  };
  Leg = (function() {
    __extends(Leg, Part);
    function Leg() {
      Leg.__super__.constructor.call(this, "Leg");
      this.subparts.push(new Subpart("lower_leg", 3));
      this.subparts.push(new Subpart("upper_leg", 3));
    }
    Leg.prototype.arm_interact = function(choice) {
      var part, _i, _len, _ref;
      this.subparts(choice).damage = 1;
      _ref = this.subparts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        if (part.damage === 0) {
          return false;
        }
      }
      return true;
    };
    Leg.prototype.interact = function() {
      Leg.__super__.interact.call(this);
      if (this.subparts[random].type === 3) {
        return {
          type: 2,
          damage: 1
        };
      }
    };
    return Leg;
  })();
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
  Part = (function() {
    function Part(name) {
      this.name = name;
      this.subparts = [];
    }
    Part.prototype.interact = function() {
      var random;
      return random = Math.round(Math.random() * this.subparts.length - 1);
    };
    return Part;
  })();
  Subpart = (function() {
    function Subpart(name, type) {
      this.name = name;
      this.type = type;
      this.damage = 0;
    }
    return Subpart;
  })();
  Torso = (function() {
    __extends(Torso, Part);
    function Torso() {
      Torso.__super__.constructor.call(this, "Torso");
      this.subparts.push(new Subpart("heart", 1));
      this.subparts.push(new Subpart("left_lung", 2));
      this.subparts.push(new Subpart("right_lung", 2));
    }
    Torso.prototype.lung_damage = function(choice) {
      this.subparts[choice].damage = 1;
      if (this.subparts[1].damage === 1 && this.subparts[2].damage === 1) {
        return true;
      }
      return false;
    };
    Torso.prototype.interact = function() {
      Torso.__super__.interact.call(this);
      if (this.subparts[random].type === 2) {
        if (this.lung_damage(random)) {
          return {
            type: 1,
            msg: "asphyxia"
          };
        }
      } else if (this.subparts[random].type === 1) {
        this.subparts[random].damage = 1;
        return {
          type: 1,
          msg: "heart failure"
        };
      } else {
        return {
          type: 0
        };
      }
    };
    return Torso;
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
      var damage, part;
      part = Math.floor(Math.random() * this.body.parts.length);
      damage = this.body.parts[part].interact();
      switch (damage.type) {
        case 1:
          this.msg.push(this.name + " dies of " + damage.msg);
          return this.body.death = 1;
        case 2:
          switch (this.body.update_ability(damage.damage)) {
            case "hand":
              return this.msg.push(this.name + " suffer hand damage!");
            case "hand_destroy":
              return this.msg.push(this.name + " 's lost all hands function");
          }
      }
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
    function mapDraw(p5, width, height) {
      this.p5 = p5;
      this.width = width;
      this.height = height;
    }
    mapDraw.prototype.draw = function(map) {
      var height, results, width, _ref, _results;
      results = map.map;
      this.p5.stroke(255);
      _results = [];
      for (height = 0, _ref = this.height; 0 <= _ref ? height <= _ref : height >= _ref; 0 <= _ref ? height++ : height--) {
        if (height < this.height) {
          _results.push((function() {
            var _ref2, _results2;
            _results2 = [];
            for (width = 0, _ref2 = this.width; 0 <= _ref2 ? width <= _ref2 : width >= _ref2; 0 <= _ref2 ? width++ : width--) {
              if (width < this.width) {
                if (results[height][width] === 1) {
                  this.p5.noFill();
                } else {
                  this.p5.fill();
                }
                _results2.push(this.p5.rect(20 * (width + map.camera_x), 20 * (height + map.camera_y), 20, 20));
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
  message_draw = function(p5, msg) {
    return p5.text(msg, 0, 595);
  };
  titleDraw = function(p5) {
    p5.textFont("monospace", 30);
    return p5.text("The City", 350, 100);
  };
  unitDraw = (function() {
    function unitDraw(p5) {
      this.p5 = p5;
    }
    unitDraw.prototype.draw = function(units, map) {
      var unit, _i, _len, _ref, _results;
      _ref = units.units;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        unit = _ref[_i];
        this.p5.fill();
        _results.push(unit.type === 1 ? (this.p5.fill(255, 69, 0), this.p5.text("H", (unit.x + map.camera_x) * 20 + 5, (unit.y + map.camera_y) * 20 - 5)) : void 0);
      }
      return _results;
    };
    return unitDraw;
  })();
  changeMode = function(mode, result) {
    if (result === "game_mode") {
      return 0;
    } else {
      return mode;
    }
  };
  circle_collision = function(x, y, object) {
    var dm, dx, dy;
    dy = y - (object.y + object.diameter / 2);
    dx = x - (object.x + object.diameter / 2);
    dm = Math.sqrt(dx * dy + dy * dy);
    if (dm < object.diameter) {
      return true;
    } else {
      return false;
    }
  };
  menu = function(p5) {
    p5.setup = function() {
      p5.size(800, 600);
      p5.frameRate(50);
      p5.background(0);
      this.talk = new Talk();
      this.mode = 1;
      this.logic_mode = new Mode();
      this.draw_mode = new ModeDraw(p5);
      return this.key_mode = new ModeKey(this.talk);
    };
    p5.keyPressed = function() {
      return p5.input_result(this.key_mode.key_pressed(this.mode, p5.key));
    };
    p5.input_result = function(result) {
      this.logic_mode.input(this.mode, result);
      this.draw_mode.input(this.mode, result);
      return this.mode = changeMode(this.mode, result);
    };
    p5.logic = function() {
      this.logic_mode.act(this.mode);
      return this.draw_mode.draw(this.mode, this.logic_mode);
    };
    return p5.draw = function() {
      return p5.logic();
    };
  };
  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    return processing = new Processing(canvas, menu);
  });
  Mode = (function() {
    function Mode() {
      this.modes = list();
    }
    Mode.prototype.act = function(n) {
      return this.modes[n].act();
    };
    Mode.prototype.input = function(n, result) {
      return this.modes[n].input(result);
    };
    Mode.prototype.update_draw = function(n) {
      return this.modes[n].update_draw();
    };
    return Mode;
  })();
  ModeDraw = (function() {
    function ModeDraw(p5) {
      this.p5 = p5;
      this.modes = listDraw(this.p5);
    }
    ModeDraw.prototype.draw = function(n, logic) {
      return this.modes[n].draw(logic.update_draw(n));
    };
    ModeDraw.prototype.input = function(n, result) {
      return this.modes[n].input(result);
    };
    return ModeDraw;
  })();
  ModeKey = (function() {
    function ModeKey(talk) {
      this.talk = talk;
      this.modes = listKey(this.talk);
    }
    ModeKey.prototype.key_pressed = function(n, key) {
      return this.modes[n].key_pressed(key);
    };
    return ModeKey;
  })();
  RadioButton = (function() {
    function RadioButton(p5, x, y) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.height = 10;
      this.width = 10;
      this.radius = this.height / 2;
      this.diameter = this.radius * 2;
      this.state = false;
    }
    RadioButton.prototype.draw = function() {
      this.p5.noFill();
      this.p5.stroke(255);
      this.p5.ellipse(this.x, this.y, this.width, this.height);
      if (this.state === true) {
        this.p5.fill();
        this.p5.stroke(255);
        return this.p5.ellipse(this.x, this.y, this.width / 2, this.height / 2);
      }
    };
    return RadioButton;
  })();
  Talk = (function() {
    function Talk(info) {
      this.info = info;
    }
    Talk.prototype.msg = function(text) {
      return this.info.push(text);
    };
    Talk.prototype.clean = function() {
      return this.info = [];
    };
    return Talk;
  })();
  TextOptions = (function() {
    function TextOptions(p5, x, y, size) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.size = size;
      this.pointer = 0;
      this.texts = [];
    }
    TextOptions.prototype.add = function(text) {
      return this.texts.push(text);
    };
    TextOptions.prototype.increase = function() {
      if (this.pointer < this.texts.length - 1) {
        return this.pointer += 1;
      } else {
        return this.pointer = 0;
      }
    };
    TextOptions.prototype.decrease = function() {
      if (this.pointer === 0) {
        return this.pointer = this.texts.length - 1;
      } else {
        return this.pointer -= 1;
      }
    };
    TextOptions.prototype.draw = function() {
      var data, pointer_y, y, _i, _len, _ref;
      this.p5.textFont("Monospace", this.size);
      y = this.y;
      _ref = this.texts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        this.p5.text(data, this.x, y);
        y += this.size;
      }
      pointer_y = this.y + (this.pointer * this.size);
      return this.p5.ellipse(this.x - 20, pointer_y - (this.size / 2), 10, 10);
    };
    return TextOptions;
  })();
}).call(this);
