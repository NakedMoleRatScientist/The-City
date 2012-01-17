(function() {
  var Arm, Body, CombatReportDrawMinorMode, CombatReportKeyMinorMode, CombatReportMinorMode, DrawMinorModeManager, DrawMode, DrawModeManager, GameDrawMode, GameKeyMode, GameMode, Head, KeyMinorModeManager, KeyMode, KeyModeManager, Leg, Map, MenuDrawMode, MenuKeyMode, MenuMode, MinorModeManager, Mode, ModeManager, MsgManager, Part, RadioButton, Relation, Subpart, TextOptions, TextOptionsDraw, Torso, Unit, Units, changeMode, circle_collision, gameMinorModeList, human_body, initializeDrawMinorModes, initializeDrawModes, initializeKeyMinorModes, initializeKeyModes, initializeMinorModes, initializeModes, mapDraw, menu, messageDraw, modeList, titleDraw, unitDraw;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
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
      return this.key_manager = new KeyModeManager(p5);
    };
    p5.keyPressed = function() {
      return p5.input_result(this.key_manager.key_pressed(this.mode, this.logic_manager));
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
      if (object.state === -1) {
        return;
      }
      return this.minor_draw.draw(object.state, object);
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
  initializeKeyMinorModes = function(name, p5) {
    var m, modes, object, _i, _len, _results;
    modes = eval(name + "MinorModeList()");
    _results = [];
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      m = modes[_i];
      object = "new " + m + "KeyMinorMode(p5)";
      _results.push(eval(object));
    }
    return _results;
  };
  initializeKeyModes = function(p5) {
    var m, modes, object, _i, _len, _results;
    modes = modeList();
    _results = [];
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      m = modes[_i];
      object = "new " + m + "KeyMode(p5)";
      _results.push(eval(object));
    }
    return _results;
  };
  initializeMinorModes = function(name, host_mode) {
    var m, modes, object, _i, _len, _results;
    modes = eval(name + "MinorModeList()");
    _results = [];
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      m = modes[_i];
      object = "new " + m + "MinorMode(host_mode)";
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
  KeyMinorModeManager = (function() {
    function KeyMinorModeManager(name, p5) {
      this.p5 = p5;
      this.modes = initializeKeyMinorModes(name, this.p5);
    }
    KeyMinorModeManager.prototype.key_pressed = function(minor) {
      return this.modes[minor].key_pressed();
    };
    return KeyMinorModeManager;
  })();
  KeyMode = (function() {
    function KeyMode(name, p5) {
      this.p5 = p5;
      this.minor_key = new KeyMinorModeManager(name, this.p5);
    }
    KeyMode.prototype.key_pressed = function(state) {
      return this.minor_key.key_pressed(state);
    };
    return KeyMode;
  })();
  KeyModeManager = (function() {
    function KeyModeManager(p5) {
      this.p5 = p5;
      this.modes = initializeKeyModes(this.p5);
    }
    KeyModeManager.prototype.key_pressed = function(n, logic) {
      var state;
      state = (logic.update_draw(n)).state;
      return this.modes[n].key_pressed(state);
    };
    return KeyModeManager;
  })();
  MinorModeManager = (function() {
    function MinorModeManager(name, parent) {
      this.parent = parent;
      this.modes = initializeMinorModes(name, this.parent);
    }
    MinorModeManager.prototype.act = function() {
      if (this.parent.state === -1) {
        return;
      }
      return this.modes[this.parent.state].act();
    };
    MinorModeManager.prototype.update = function() {
      return this.modes[this.parent.state].update();
    };
    MinorModeManager.prototype.input = function(result) {
      if (this.parent.state === -1) {
        return;
      }
      return this.modes[this.parent.state].input(result);
    };
    MinorModeManager.prototype.update_draw = function() {
      if (this.parent.state === -1) {
        return -1;
      }
      return this.modes[this.parent.state].update_draw();
    };
    return MinorModeManager;
  })();
  Mode = (function() {
    function Mode(name) {
      this.state = -1;
      this.minor = new MinorModeManager(name, this);
    }
    Mode.prototype.act = function() {
      return this.minor.act();
    };
    Mode.prototype.input = function(result) {
      return this.minor.input(result);
    };
    Mode.prototype.update_draw = function() {
      return this.minor.update_draw();
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
    function TextOptions() {
      this.options = [];
      this.pointer = 0;
      this.length = 0;
    }
    TextOptions.prototype.add_text = function(text) {
      var t, _i, _len;
      for (_i = 0, _len = text.length; _i < _len; _i++) {
        t = text[_i];
        this.options.push(t);
      }
      return this.length = this.options.length;
    };
    TextOptions.prototype.increase = function() {
      if (this.pointer < this.length) {
        return this.pointer += 1;
      } else {
        return this.pointer = 0;
      }
    };
    TextOptions.prototype.decrease = function() {
      if (this.pointer === 0) {
        return this.pointer = this.length;
      } else {
        return this.pointer -= 1;
      }
    };
    TextOptions.prototype.clean = function() {
      return this.options = [];
    };
    return TextOptions;
  })();
  TextOptionsDraw = (function() {
    function TextOptionsDraw(p5, x, y, size) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.size = size;
    }
    TextOptionsDraw.prototype.draw = function(texts, pointer) {
      var data, pointer_y, y, _i, _len;
      this.p5.textFont("Monospace", this.size);
      y = this.y;
      for (_i = 0, _len = texts.length; _i < _len; _i++) {
        data = texts[_i];
        this.p5.text(data, this.x, y);
        y += this.size;
      }
      pointer_y = this.y + (pointer * this.size);
      if (texts.length > 0) {
        return this.p5.ellipse(this.x - 20, pointer_y - (this.size / 2), 10, 10);
      }
    };
    return TextOptionsDraw;
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
      var map, msg, units;
      switch (object.state) {
        case -1:
          map = object.map;
          units = object.units;
          msg = object.msg;
          this.p5.background(0);
          this.map_draw.draw(map);
          this.unit_draw.draw(units, map);
          if (msg !== -1) {
            return messageDraw(this.p5, msg);
          }
          break;
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
    __extends(GameKeyMode, KeyMode);
    function GameKeyMode(p5) {
      this.p5 = p5;
      GameKeyMode.__super__.constructor.call(this, "game", this.p5);
    }
    GameKeyMode.prototype.key_pressed = function(state) {
      switch (state) {
        case -1:
          console.log(this.p5.key.code);
          switch (this.p5.key.code) {
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
          break;
        case 0:
          return GameKeyMode.__super__.key_pressed.call(this, state);
      }
    };
    return GameKeyMode;
  })();
  GameMode = (function() {
    __extends(GameMode, Mode);
    function GameMode() {
      this.map = new Map(100, 100);
      this.map.generate();
      this.units = new Units("game");
      GameMode.__super__.constructor.call(this, "game");
    }
    GameMode.prototype.act = function() {
      this.units.move();
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
          this.state = 0;
          return this.minor.update();
        case "back":
          return this.state = -1;
      }
    };
    GameMode.prototype.update_draw = function() {
      if (this.state === -1) {
        return {
          units: this.units,
          map: this.map,
          msg: this.units.msg_manager.get_last_update(),
          state: -1
        };
      }
      return GameMode.__super__.update_draw.call(this);
    };
    return GameMode;
  })();
  MenuDrawMode = (function() {
    function MenuDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptionsDraw(this.p5, 250, 250, 18);
      this.size = 0;
    }
    MenuDrawMode.prototype.draw = function(object) {
      this.p5.background(0);
      titleDraw(this.p5);
      return this.texts.draw(object.options, object.pointer);
    };
    MenuDrawMode.prototype.input = function(result) {};
    return MenuDrawMode;
  })();
  MenuKeyMode = (function() {
    function MenuKeyMode(p5) {
      this.p5 = p5;
    }
    MenuKeyMode.prototype.key_pressed = function() {
      console.log(this.p5.key.code);
      switch (this.p5.key.code) {
        case 115:
          return "down";
        case 119:
          return "up";
        case 10:
          return "game_mode";
        default:
          return false;
      }
    };
    return MenuKeyMode;
  })();
  MenuMode = (function() {
    function MenuMode() {
      this.options = new TextOptions();
      this.options.add_text(["New Game", "Test Arena"]);
    }
    MenuMode.prototype.act = function() {};
    MenuMode.prototype.input = function(result) {
      switch (result) {
        case "up":
          return this.options.decrease();
        case "down":
          return this.options.increase();
      }
    };
    MenuMode.prototype.update_draw = function(n) {
      return {
        options: this.options.options,
        pointer: this.options.pointer
      };
    };
    return MenuMode;
  })();
  modeList = function() {
    return ["Game", "Menu"];
  };
  MsgManager = (function() {
    function MsgManager() {
      this.relations = [];
      this.last_status = -1;
    }
    MsgManager.prototype.create_combat_relation = function(unit_one, unit_two) {
      this.relations.push(new Relation([unit_one, unit_two]));
      return this.relations.length - 1;
    };
    MsgManager.prototype.find_relation = function(unit_one, unit_two) {
      var n, r, _i, _len, _ref;
      n = 0;
      _ref = this.relations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        if (__indexOf.call(r.actors, unit_one) >= 0 && __indexOf.call(r.actors, unit_two) >= 0) {
          return n;
        }
        n += 1;
      }
      return false;
    };
    MsgManager.prototype.find_or_create_combat_relation = function(unit_one, unit_two) {
      var n;
      n = this.find_relation(unit_one, unit_two);
      if (n === false) {
        return this.create_combat_relation(unit_one, unit_two);
      }
      return n;
    };
    MsgManager.prototype.active_msg = function(unit_one, unit_two, msg) {
      var n;
      n = this.find_or_create_combat_relation(unit_one, unit_two);
      this.relations[n].add_msg(unit_one, unit_two, msg);
      this.last_status = n;
      return n;
    };
    MsgManager.prototype.passive_msg = function(unit_one, unit_two, msg) {
      var n;
      n = this.find_or_create_combat_relation(unit_one, unit_two);
      this.relations[n].add_passive_msg(unit_two, msg);
      return this.last_status = n;
    };
    MsgManager.prototype.get_last_update = function() {
      if (this.last_status === -1) {
        return -1;
      }
      return this.relations[this.last_status].last();
    };
    MsgManager.prototype.combat_death = function(object) {
      if (object === false) {
        return;
      }
      return this.active_msg(object.actors[0], object.actors[1], object.action);
    };
    MsgManager.prototype.strike = function(object) {
      var msg, part;
      if (object === -1) {
        return;
      }
      part = object.part;
      msg = "strikes " + part;
      this.active_msg(object.actors[0], object.actors[1], msg);
      msg = "'s " + part + " suffers damage!";
      return this.passive_msg(object.actors[0], object.actors[1], msg);
    };
    return MsgManager;
  })();
  Units = (function() {
    function Units(scenario) {
      this.units = [];
      this.msg_manager = new MsgManager();
      if (scenario === "game") {
        this.units.push(new Unit(10, 10, "Miya", 1));
        this.units.push(new Unit(10, 20, "John", 1));
        this.units[1].hostility = 1;
        this.units[0].target = this.units[1];
      }
    }
    Units.prototype.move = function() {
      var unit, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        unit = _ref[_i];
        unit.move();
      }
      _ref2 = this.units;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        unit = _ref2[_j];
        this.msg_manager.strike(unit.attack());
      }
      _ref3 = this.units;
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        unit = _ref3[_k];
        _results.push(this.msg_manager.combat_death(unit.nullify_target()));
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
      this.random = Math.floor(Math.random() * this.subparts.length);
      return this.subparts[this.random];
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
      var part;
      part = Arm.__super__.interact.call(this);
      if (part.type === 3) {
        part.damage = 1;
        return {
          type: 2,
          part: part.name,
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
      var part;
      part = Head.__super__.interact.call(this);
      if (part.type === 1) {
        return {
          type: 1,
          part: part.name,
          cause: "skull cavein"
        };
      } else {
        return {
          type: 0,
          part: part.name
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
    Leg.prototype.interact = function() {
      var part;
      part = Leg.__super__.interact.call(this);
      if (part.type === 3) {
        part.damage = 1;
        return {
          type: 2,
          part: part.name,
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
  Relation = (function() {
    function Relation(actors) {
      this.actors = actors;
      this.msgs = [];
    }
    Relation.prototype.add_msg = function(unit_one, unit_two, act) {
      return this.msgs.push(unit_one + " " + act + " " + unit_two + "!");
    };
    Relation.prototype.add_passive_msg = function(unit_two, msg) {
      return this.msgs.push(unit_two + msg);
    };
    Relation.prototype.last = function() {
      return this.msgs[this.msgs.length - 1];
    };
    Relation.prototype.summary = function() {
      return this.actors[0] + " and " + this.actors[1] + " are engaged in mortal combat!";
    };
    return Relation;
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
      var part;
      part = Torso.__super__.interact.call(this);
      if (part.type === 2) {
        if (this.lung_damage(this.random)) {
          return {
            type: 1,
            part: part.name,
            cause: "asphyxia"
          };
        }
        return {
          type: 0,
          part: part.name
        };
      } else if (part.type === 1) {
        part.damage = 1;
        return {
          type: 1,
          part: part.name,
          cause: "heart failure"
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
    Unit.prototype.attack_chance = function() {
      this.goal_x = this.target.x - 1;
      this.goal_y = this.target.y - 1;
      if ((this.target.x + 1) === this.x || (this.target.x - 1) === this.x) {
        if ((this.target.y + 1) === this.y || (this.target.y - 1) === this.y) {
          if ((Math.random() * 10) > 5) {
            return true;
          }
        }
      }
      return false;
    };
    Unit.prototype.attack = function() {
      if (this.target === null || !this.body.check_combat_ability()) {
        return -1;
      }
      if (this.attack_chance()) {
        return this.target.damage(this);
      }
      return -1;
    };
    Unit.prototype.nullify_target = function() {
      var target;
      if (this.target === null) {
        return false;
      }
      if (this.target.body.check_death() === true) {
        target = this.target;
        this.target = null;
        return {
          actors: [this.name, target.name],
          action: "killed"
        };
      }
      return false;
    };
    Unit.prototype.damage = function(unit) {
      var damage, object, part;
      part = Math.floor(Math.random() * this.body.parts.length);
      damage = this.body.parts[part].interact();
      object = {
        actors: [unit.name, this.name],
        part: damage.part,
        type: damage.type,
        special: null
      };
      switch (damage.type) {
        case 1:
          this.body.death = 1;
          break;
        case 2:
          switch (this.body.update_ability(damage.damage)) {
            case "hand":
              object.special = 0;
              break;
            case "hand_destroy":
              object.special = 1;
              break;
            case "leg":
              object.special = 2;
          }
      }
      return object;
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
      this.texts = new TextOptionsDraw(this.p5, 30, 12, 12);
    }
    CombatReportDrawMinorMode.prototype.draw = function(object) {
      this.p5.background(0);
      if (object.type === 0) {
        return this.texts.draw(object.summaries, object.pointer);
      } else {
        return this.texts.draw(object.log, object.pointer);
      }
    };
    return CombatReportDrawMinorMode;
  })();
  CombatReportKeyMinorMode = (function() {
    function CombatReportKeyMinorMode(p5) {
      this.p5 = p5;
    }
    CombatReportKeyMinorMode.prototype.key_pressed = function() {
      console.log(this.p5.key.code);
      switch (this.p5.key.code) {
        case 113:
          return "back";
        case 10:
          return "select";
        case 119:
          return "up";
        case 115:
          return "down";
      }
    };
    return CombatReportKeyMinorMode;
  })();
  CombatReportMinorMode = (function() {
    function CombatReportMinorMode(parent) {
      this.parent = parent;
      this.msg = [];
      this.options = new TextOptions();
      this.state = null;
    }
    CombatReportMinorMode.prototype.update = function() {
      var r, _i, _len, _ref, _results;
      this.options.clean();
      if (this.state === null) {
        _ref = this.parent.units.msg_manager.relations;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          _results.push(this.options.add_text([r.summary()]));
        }
        return _results;
      } else {
        return this.options.add_text(this.parent.units.msg_manager.relations[this.state].msgs);
      }
    };
    CombatReportMinorMode.prototype.act = function() {};
    CombatReportMinorMode.prototype.input = function(result) {
      switch (result) {
        case "up":
          return this.options.decrease();
        case "down":
          return this.options.increase();
        case "select":
          if (this.state === null) {
            this.state = this.options.pointer;
            return this.update();
          }
      }
    };
    CombatReportMinorMode.prototype.input_info = function(msg) {
      this.msg = msg;
    };
    CombatReportMinorMode.prototype.update_draw = function() {
      if (this.state === null) {
        return {
          summaries: this.options.options,
          pointer: this.options.pointer,
          state: this.parent.state,
          type: 0
        };
      } else {
        return {
          log: this.options.options,
          pointer: this.options.pointer,
          state: this.parent.state,
          type: 1
        };
      }
    };
    return CombatReportMinorMode;
  })();
  gameMinorModeList = function() {
    return ["CombatReport"];
  };
}).call(this);
