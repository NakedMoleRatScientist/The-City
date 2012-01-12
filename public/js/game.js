(function() {
  var Arm, Body, CombatReportDrawMinorMode, CombatReportMinorMode, DrawMinorModeManager, DrawMode, DrawModeManager, GameDrawMode, GameKeyMode, GameMode, Head, KeyMode, Leg, Map, MenuDrawMode, MenuKeyMode, MenuMode, Messages, MinorModeManager, Mode, ModeManager, Msg, Part, RadioButton, Subpart, TextOptions, Torso, Unit, Units, changeMode, circle_collision, gameMinorModeList, human_body, initializeDrawMinorModes, initializeDrawModes, initializeKeyModes, initializeMinorModes, initializeModes, mapDraw, menu, messageDraw, modeList, titleDraw, unitDraw;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
      this.mode = 1;
      this.logic_manager = new ModeManager();
      this.draw_manager = new DrawModeManager(p5);
      return this.key_manager = new KeyMode();
    };
    p5.keyPressed = function() {
      return p5.input_result(this.key_manager.key_pressed(this.mode, p5.key));
    };
    p5.input_result = function(result) {
      this.logic_manager.input(this.mode, result);
      this.draw_manager.input(this.mode, result);
      return this.mode = changeMode(this.mode, result);
    };
    p5.logic = function() {
      this.logic_manager.act(this.mode);
      return this.draw_manager.draw(this.mode, this.logic_manager);
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
  DrawMinorModeManager = (function() {
    function DrawMinorModeManager(name, p5) {
      this.modes = initializeDrawMinorModes(name, p5);
    }
    DrawMinorModeManager.prototype.draw = function(n, object) {
      return this.modes[n].draw(object);
    };
    DrawMinorModeManager.prototype.input = function(n, result) {
      return this.modes[n].input(result);
    };
    return DrawMinorModeManager;
  })();
  DrawMode = (function() {
    function DrawMode(name, p5) {
      this.minor_draw = new DrawMinorModeManager(name, p5);
    }
    DrawMode.prototype.draw = function(object) {
      if (object.minor === -1) {
        return;
      }
      return this.minor_draw.draw(object.minor, object);
    };
    DrawMode.prototype.input = function(result) {};
    return DrawMode;
  })();
  DrawModeManager = (function() {
    function DrawModeManager(p5) {
      this.p5 = p5;
      this.modes = initializeDrawModes(this.p5);
    }
    DrawModeManager.prototype.draw = function(n, logic) {
      return this.modes[n].draw(logic.update_draw(n));
    };
    DrawModeManager.prototype.input = function(n, result) {
      return this.modes[n].input(result);
    };
    return DrawModeManager;
  })();
  initializeDrawMinorModes = function(name, p5) {
    var m, modes, object, _i, _len, _results;
    modes = eval(name + "MinorModeList()");
    _results = [];
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      m = modes[_i];
      object = "new " + m + "DrawMinorMode(p5)";
      _results.push(eval(object));
    }
    return _results;
  };
  initializeDrawModes = function(p5) {
    var m, modes, object, _i, _len, _results;
    modes = modeList();
    _results = [];
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      m = modes[_i];
      object = "new " + m + "DrawMode(p5)";
      _results.push(eval(object));
    }
    return _results;
  };
  initializeKeyModes = function() {
    var m, modes, object, _i, _len, _results;
    modes = modeList();
    _results = [];
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      m = modes[_i];
      object = "new " + m + "KeyMode()";
      _results.push(eval(object));
    }
    return _results;
  };
  initializeMinorModes = function(name, mode) {
    var m, modes, object, _i, _len, _results;
    modes = eval(name + "MinorModeList()");
    _results = [];
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      m = modes[_i];
      object = "new " + m + "MinorMode(mode)";
      _results.push(eval(object));
    }
    return _results;
  };
  initializeModes = function() {
    var m, modes, object, _i, _len, _results;
    modes = modeList();
    _results = [];
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      m = modes[_i];
      object = "new " + m + "Mode()";
      _results.push(eval(object));
    }
    return _results;
  };
  KeyMode = (function() {
    function KeyMode() {
      this.modes = initializeKeyModes();
    }
    KeyMode.prototype.key_pressed = function(n, key) {
      return this.modes[n].key_pressed(key);
    };
    return KeyMode;
  })();
  MinorModeManager = (function() {
    function MinorModeManager(name, mode) {
      this.modes = initializeMinorModes(name, mode);
    }
    MinorModeManager.prototype.act = function(state) {
      if (state === -1) {
        return;
      }
      return this.modes[state].act();
    };
    MinorModeManager.prototype.input = function(result, state) {
      if (state === -1) {
        return;
      }
      return this.modes[state].input(result);
    };
    MinorModeManager.prototype.update_draw = function(state) {
      if (state === -1) {
        return -1;
      }
      return this.modes[state].update_draw();
    };
    return MinorModeManager;
  })();
  Mode = (function() {
    function Mode(name) {
      this.state = -1;
      this.minor = new MinorModeManager(name);
    }
    Mode.prototype.act = function() {
      return this.minor.act(this.state);
    };
    Mode.prototype.input = function(result) {
      return this.minor.input(result, this.state);
    };
    Mode.prototype.update_draw = function() {
      return this.minor.update_draw(this.state);
    };
    return Mode;
  })();
  ModeManager = (function() {
    function ModeManager() {
      this.modes = initializeModes();
    }
    ModeManager.prototype.act = function(n) {
      return this.modes[n].act();
    };
    ModeManager.prototype.input = function(n, result) {
      return this.modes[n].input(result);
    };
    ModeManager.prototype.update_draw = function(n) {
      return this.modes[n].update_draw();
    };
    return ModeManager;
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
  GameDrawMode = (function() {
    __extends(GameDrawMode, DrawMode);
    function GameDrawMode(p5) {
      this.p5 = p5;
      this.unit_draw = new unitDraw(this.p5);
      this.map_draw = new mapDraw(this.p5, 100, 100);
      GameDrawMode.__super__.constructor.call(this, "game", this.p5);
    }
    GameDrawMode.prototype.draw = function(object) {
      var map, msgs, units;
      switch (object.minor) {
        case -1:
          map = object.map;
          units = object.units;
          msgs = object.msgs;
          this.p5.background(0);
          this.map_draw.draw(map);
          this.unit_draw.draw(units, map);
          return messageDraw(this.p5, msgs[msgs.length - 1]);
        case 0:
          return GameDrawMode.__super__.draw.call(this, object);
      }
    };
    GameDrawMode.prototype.input = function(result) {
      return GameDrawMode.__super__.input.call(this, result);
    };
    return GameDrawMode;
  })();
  GameKeyMode = (function() {
    function GameKeyMode() {}
    GameKeyMode.prototype.key_pressed = function(key) {
      console.log(key.code);
      switch (key.code) {
        case 97:
          return "right";
        case 100:
          return "left";
        case 114:
          return "report";
        case 115:
          return "up";
        case 119:
          return "down";
      }
    };
    return GameKeyMode;
  })();
  GameMode = (function() {
    __extends(GameMode, Mode);
    function GameMode() {
      this.map = new Map(100, 100);
      this.map.generate();
      this.units = new Units();
      this.units.units.push(new Unit(10, 10, "Miya", 1));
      this.units.units.push(new Unit(10, 20, "John", 1));
      this.units.units[1].hostility = 1;
      this.units.units[0].target = this.units.units[1];
      this.messages = new Messages();
      GameMode.__super__.constructor.call(this, "game");
    }
    GameMode.prototype.act = function() {
      this.units.move();
      this.messages.update(this.units.units);
      return this.units.clean();
    };
    GameMode.prototype.input = function(result) {
      GameMode.__super__.input.call(this, result);
      switch (result) {
        case "up":
          return this.map.move_camera(0, -1);
        case "down":
          return this.map.move_camera(0, 1);
        case "left":
          return this.map.move_camera(-1, 0);
        case "right":
          return this.map.move_camera(1, 0);
        case "report":
          return this.state = 0;
      }
    };
    GameMode.prototype.update_draw = function() {
      return {
        units: this.units,
        map: this.map,
        msgs: this.messages.msg,
        minor: this.minor.update_draw(this.state)
      };
    };
    return GameMode;
  })();
  MenuDrawMode = (function() {
    function MenuDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptions(this.p5, 250, 250, 18);
      this.texts.add("New Game");
      this.texts.add("Test Arena");
    }
    MenuDrawMode.prototype.draw = function() {
      this.p5.background(0);
      titleDraw(this.p5);
      return this.texts.draw();
    };
    MenuDrawMode.prototype.input = function(result) {
      if (result === "down") {
        return this.texts.increase();
      } else if (result === "up") {
        return this.texts.decrease();
      }
    };
    return MenuDrawMode;
  })();
  MenuKeyMode = (function() {
    function MenuKeyMode() {}
    MenuKeyMode.prototype.key_pressed = function(key) {
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
    return MenuKeyMode;
  })();
  MenuMode = (function() {
    function MenuMode() {}
    MenuMode.prototype.act = function() {};
    MenuMode.prototype.input = function(result) {};
    MenuMode.prototype.update_draw = function() {};
    return MenuMode;
  })();
  modeList = function() {
    return ["Game", "Menu"];
  };
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
  Part = (function() {
    function Part(name) {
      this.name = name;
      this.subparts = [];
    }
    Part.prototype.interact = function() {
      return this.random = Math.floor(Math.random() * this.subparts.length);
    };
    return Part;
  })();
  Arm = (function() {
    __extends(Arm, Part);
    function Arm() {
      Arm.__super__.constructor.call(this, "Arm");
      this.subparts.push(new Subpart("lower_arm", 3));
      this.subparts.push(new Subpart("upper_arm", 3));
      this.subparts.push(new Subpart("hand", 3));
    }
    Arm.prototype.interact = function() {
      Arm.__super__.interact.call(this);
      if (this.subparts[this.random].type === 3) {
        this.subparts[this.random].damage = 1;
        return {
          type: 2,
          damage: 0
        };
      } else {
        return {
          type: 0
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
      this.leg = 0;
    }
    Body.prototype.check_death = function() {
      if (this.death === 1) {
        return true;
      } else {
        return false;
      }
    };
    Body.prototype.update_ability = function(n) {
      switch (n) {
        case 0:
          this.hand += 1;
          if (this.hand === 2) {
            return "hand_destroy";
          }
          return "hand";
        case 1:
          this.leg += 1;
          if (this.leg === 2) {
            return "leg_destroy";
          }
          return "leg";
      }
    };
    Body.prototype.check_combat_ability = function() {
      if (this.hand < 2) {
        return true;
      }
      return false;
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
      if (this.subparts[this.random].type === 1) {
        return {
          type: 1,
          msg: "skull cavein"
        };
      } else {
        return {
          type: 0,
          msg: this.subparts[this.random].name + " suffered damage"
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
      if (this.subparts[this.random].type === 3) {
        return {
          type: 2,
          damage: 1
        };
      } else {
        return {
          type: 0
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
  Messages = (function() {
    function Messages() {
      this.msg = [];
    }
    Messages.prototype.update = function(units) {
      var unit, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = units.length; _i < _len; _i++) {
        unit = units[_i];
        _results.push(this.msg = this.msg.concat(unit.get_msg()));
      }
      return _results;
    };
    return Messages;
  })();
  Msg = (function() {
    function Msg(belongs, info) {
      this.belongs = belongs;
      this.info = info;
    }
    return Msg;
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
      if (this.subparts[this.random].type === 2) {
        if (this.lung_damage(this.random)) {
          return {
            type: 1,
            msg: "asphyxia"
          };
        }
        return {
          type: 0,
          msg: "lung got bruised"
        };
      } else if (this.subparts[this.random].type === 1) {
        this.subparts[this.random].damage = 1;
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
      if (this.target === null || !this.body.check_combat_ability()) {
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
        case 0:
          return this.msg.push(this.name + "'s " + damage.msg);
        case 1:
          this.msg.push(this.name + " dies of " + damage.msg);
          return this.body.death = 1;
        case 2:
          switch (this.body.update_ability(damage.damage)) {
            case "hand":
              return this.msg.push(this.name + " suffers hand damage!");
            case "hand_destroy":
              return this.msg.push(this.name + " 's lost all hands function");
            case "leg":
              return this.msg.push(this.name + " suffers leg damage!");
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
  messageDraw = function(p5, msg) {
    p5.fill(0);
    p5.rect(0, 580, 800, 20);
    p5.fill(255, 0, 0);
    return p5.text(msg, 5, 595);
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
  CombatReportDrawMinorMode = (function() {
    function CombatReportDrawMinorMode(p5) {
      this.p5 = p5;
    }
    CombatReportDrawMinorMode.prototype.draw = function(object) {
      var m, msgs, y, _i, _len, _results;
      this.p5.background(0);
      msgs = object.msgs;
      y = 0;
      _results = [];
      for (_i = 0, _len = msgs.length; _i < _len; _i++) {
        m = msgs[_i];
        _results.push(this.p5.text(m, 5, y += 12));
      }
      return _results;
    };
    return CombatReportDrawMinorMode;
  })();
  CombatReportMinorMode = (function() {
    function CombatReportMinorMode(parent) {
      this.parent = parent;
      this.msg = [];
    }
    CombatReportMinorMode.prototype.act = function() {};
    CombatReportMinorMode.prototype.input = function(result) {};
    CombatReportMinorMode.prototype.input_info = function(msg) {
      this.msg = msg;
    };
    CombatReportMinorMode.prototype.update_draw = function() {
      return 0;
    };
    return CombatReportMinorMode;
  })();
  gameMinorModeList = function() {
    return ["CombatReport"];
  };
}).call(this);
