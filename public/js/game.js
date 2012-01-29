(function() {
  var Arm, Body, CombatReportDrawMinorMode, CombatReportKeyMinorMode, CombatReportMinorMode, CrystalPile, CrystalTree, DrawMinorModeManager, DrawMode, DrawModeManager, Floor, GameDrawMode, GameKeyMode, GameMode, Head, JobsManager, KeyMinorModeManager, KeyMode, KeyModeManager, Leg, Map, MenuDrawMode, MenuKeyMode, MenuMode, MinorModeManager, Mode, ModeManager, Mouse, MsgManager, Part, RadioButton, Relation, ScenarioDrawMode, ScenarioKeyMode, ScenarioMode, Stockpile, Subpart, TextOptions, TextOptionsDraw, Torso, Unit, Units, buildMenuDraw, circle_to_circle_collision, combatLogMenuDraw, combatMainMenuDraw, distance_between_two_points, gameMenuDraw, gameMinorModeList, human_body, initializeDrawMinorModes, initializeDrawModes, initializeKeyMinorModes, initializeKeyModes, initializeMinorModes, initializeModes, killsDraw, mapDraw, menu, menuDraw, menuMinorModeList, messageDraw, modeList, mouseDraw, point_circle_collision, scenarioList, scrollDraw, titleDraw, unitDraw;
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
  circle_to_circle_collision = function(one, two) {
    var combined_radii, distance, one_radius, two_radius;
    distance = distance_between_two_points(one, two);
    one_radius = one.diameter / 2;
    two_radius = two.diameter / 2;
    combined_radii = one_radius + two_radius;
    if (distance < combined_radii) {
      return true;
    }
    return false;
  };
  distance_between_two_points = function(one, two) {
    var square_x, square_y, substract_x, substract_y;
    substract_x = one.x - two.x;
    substract_y = one.y - two.y;
    square_x = substract_x * substract_x;
    square_y = substract_y * substract_y;
    return Math.sqrt(square_x + square_y);
  };
  menu = function(p5) {
    p5.setup = function() {
      p5.size(800, 600);
      p5.frameRate(50);
      p5.background(0);
      this.logic_manager = new ModeManager();
      this.draw_manager = new DrawModeManager(p5);
      return this.key_manager = new KeyModeManager(p5);
    };
    p5.keyPressed = function() {
      return p5.input_result(this.key_manager.key_pressed(this.logic_manager));
    };
    p5.mousePressed = function() {
      return p5.mouse_input(this.key_manager.mouse_pressed(this.logic_manager));
    };
    p5.mouse_input = function(result) {
      return this.logic_manager.mouse_input(result);
    };
    p5.input_result = function(result) {
      this.logic_manager.input(result);
      return this.draw_manager.input(result);
    };
    p5.logic = function() {
      this.logic_manager.act();
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
    DrawModeManager.prototype.draw = function(logic) {
      return this.modes[logic.n].draw(logic.update_draw());
    };
    DrawModeManager.prototype.input = function(logic, result) {
      return this.modes[logic.n].input(result);
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
    KeyMode.prototype.mouse_pressed = function(state) {};
    return KeyMode;
  })();
  KeyModeManager = (function() {
    function KeyModeManager(p5) {
      this.p5 = p5;
      this.modes = initializeKeyModes(this.p5);
    }
    KeyModeManager.prototype.key_pressed = function(logic) {
      var state;
      state = (logic.update_draw()).state;
      if (state === null) {
        return this.modes[logic.n].key_pressed();
      }
      return this.modes[logic.n].key_pressed(state);
    };
    KeyModeManager.prototype.mouse_pressed = function(logic) {
      var state;
      state = (logic.update_draw()).state;
      if (state === null) {
        return this.modes[logic.n].mouse_pressed();
      }
      return this.modes[logic.n].mouse_pressed(state);
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
    Mode.prototype.mouse_input = function() {};
    Mode.prototype.update_mode = function(n) {
      return n;
    };
    return Mode;
  })();
  ModeManager = (function() {
    function ModeManager() {
      this.modes = initializeModes();
      this.n = 1;
    }
    ModeManager.prototype.act = function() {
      return this.modes[this.n].act();
    };
    ModeManager.prototype.input = function(result) {
      return this.modes[this.n].input(result);
    };
    ModeManager.prototype.update_draw = function() {
      return this.modes[this.n].update_draw();
    };
    ModeManager.prototype.update_mode = function() {
      var object;
      object = this.modes[this.n].update_mode(this.n);
      return object;
    };
    ModeManager.prototype.game_mode = function(name) {
      this.name = name;
      return this.modes[0].units.initialize_scenario(this.name);
    };
    ModeManager.prototype.mouse_input = function(result) {
      return this.modes[this.n].mouse_input(result);
    };
    ModeManager.prototype.switch_mode = function(n) {
      this.n = n;
      if (this.n === 0) {
        return this.game_mode("game");
      }
    };
    return ModeManager;
  })();
  point_circle_collision = function(x, y, object) {
    var dm, dx, dy;
    dy = y - (object.y + object.diameter / 2);
    dx = x - (object.x + object.diameter / 2);
    dm = Math.sqrt(dx * dx + dy * dy);
    if (dm < object.diameter) {
      return true;
    } else {
      return false;
    }
  };
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
      if (this.pointer < (this.length - 1)) {
        return this.pointer += 1;
      } else {
        return this.pointer = 0;
      }
    };
    TextOptions.prototype.decrease = function() {
      if (this.pointer === 0) {
        return this.pointer = this.length - 1;
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
      this.offset_y = 0;
    }
    TextOptionsDraw.prototype.draw = function(texts, pointer) {
      var data, pointer_y, y, _i, _len;
      this.p5.textFont("Monospace", this.size);
      y = this.y + this.offset_y;
      for (_i = 0, _len = texts.length; _i < _len; _i++) {
        data = texts[_i];
        this.p5.text(data, this.x, y);
        y += this.size;
      }
      pointer_y = this.y + this.offset_y + (pointer * this.size);
      if (texts.length > 0) {
        this.p5.ellipse(this.x - 20, pointer_y - (this.size / 2), 10, 10);
      }
      return this.offset_y = 0;
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
          if (object.menu !== -1) {
            menuDraw(this.p5);
          }
          switch (object.menu) {
            case 0:
              gameMenuDraw(this.p5);
              break;
            case 1:
              buildMenuDraw(this.p5);
          }
          if (msg !== -1) {
            messageDraw(this.p5, msg);
          }
          return mouseDraw(this.p5, object.mouse, map.camera_x, map.camera_y);
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
            case 98:
              return "build";
            case 99:
              return "crystal";
            case 100:
              return "left";
            case 114:
              return "report";
            case 115:
              return "up";
            case 119:
              return "down";
            case 109:
              return "menu";
            default:
              return false;
          }
          break;
        case 0:
          GameKeyMode.__super__.key_pressed.call(this, state);
      }
      return false;
    };
    GameKeyMode.prototype.mouse_pressed = function(state) {
      switch (state) {
        case -1:
          return {
            x: this.p5.mouseX,
            y: this.p5.mouseY
          };
      }
    };
    return GameKeyMode;
  })();
  GameMode = (function() {
    __extends(GameMode, Mode);
    function GameMode() {
      this.map = new Map(100, 100);
      this.map.generate();
      this.units = new Units(this.map);
      this.menu = -1;
      this.mouse = new Mouse();
      this.jobs = new JobsManager(this.map, this.units.units);
      GameMode.__super__.constructor.call(this, "game");
    }
    GameMode.prototype.act = function() {
      this.units.move();
      this.units.clean();
      this.jobs.queuing();
      return this.jobs.assigns();
    };
    GameMode.prototype.input = function(result) {
      GameMode.__super__.input.call(this, result);
      if (this.state === -1) {
        switch (result) {
          case "up":
            this.map.move_camera(0, -1);
            return this.mouse.offset(0, -1);
          case "down":
            this.map.move_camera(0, 1);
            return this.mouse.offset(0, 1);
          case "left":
            this.map.move_camera(-1, 0);
            return this.mouse.offset(-1, 0);
          case "right":
            this.map.move_camera(1, 0);
            return this.mouse.offset(1, 0);
          case "crystal":
            if (this.menu === 1) {
              this.mouse.mode = 1;
              return this.mouse.build = "crystal";
            }
            break;
          case "report":
            this.state = 0;
            return this.minor.update();
          case "build":
            if (this.menu === 0) {
              return this.menu = 1;
            }
            break;
          case "menu":
            if (this.menu !== -1) {
              this.menu = -1;
              return this.mouse.mode = 0;
            } else if (this.menu === -1) {
              return this.menu = 0;
            }
        }
      }
    };
    GameMode.prototype.mouse_input = function(result) {
      if (this.state === -1) {
        this.mouse.x = result.x;
        this.mouse.y = result.y;
        return this.map.add_stockpile(this.mouse);
      }
    };
    GameMode.prototype.update_draw = function() {
      if (this.state === -1) {
        return {
          units: this.units,
          map: this.map,
          msg: this.units.msg_manager.get_last_update(),
          state: -1,
          menu: this.menu,
          mouse: this.mouse
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
          return "select";
        default:
          return false;
      }
    };
    MenuKeyMode.prototype.mouse_pressed = function(state) {};
    return MenuKeyMode;
  })();
  MenuMode = (function() {
    __extends(MenuMode, Mode);
    function MenuMode() {
      this.options = new TextOptions();
      this.options.add_text(["New Game", "Test Arena"]);
      this.mode = -1;
      MenuMode.__super__.constructor.call(this, "menu");
    }
    MenuMode.prototype.act = function() {};
    MenuMode.prototype.input = function(result) {
      switch (result) {
        case "up":
          return this.options.decrease();
        case "down":
          return this.options.increase();
        case "select":
          if (this.options.pointer === 0) {
            return this.mode = 0;
          } else {
            return this.mode = 2;
          }
      }
    };
    MenuMode.prototype.update_draw = function(n) {
      return {
        options: this.options.options,
        pointer: this.options.pointer,
        state: null
      };
    };
    MenuMode.prototype.update_mode = function(n) {
      if (this.mode === -1) {
        return MenuMode.__super__.update_mode.call(this, n);
      } else {
        return this.mode;
      }
    };
    return MenuMode;
  })();
  modeList = function() {
    return ["Game", "Menu", "Scenario"];
  };
  ScenarioDrawMode = (function() {
    __extends(ScenarioDrawMode, DrawMode);
    function ScenarioDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptionsDraw(this.p5, 30, 12, 12);
    }
    ScenarioDrawMode.prototype.draw = function(object) {
      this.p5.background(0);
      return this.texts.draw(object.options, object.pointer);
    };
    ScenarioDrawMode.prototype.input = function(result) {};
    return ScenarioDrawMode;
  })();
  ScenarioKeyMode = (function() {
    __extends(ScenarioKeyMode, KeyMode);
    function ScenarioKeyMode(p5) {
      this.p5 = p5;
    }
    ScenarioKeyMode.prototype.key_pressed = function(state) {
      switch (this.p5.key.code) {
        case 115:
          return "down";
        case 119:
          return "up";
        case 10:
          return "select";
      }
    };
    return ScenarioKeyMode;
  })();
  ScenarioMode = (function() {
    __extends(ScenarioMode, Mode);
    function ScenarioMode() {
      this.options = new TextOptions();
      this.options.add_text(scenarioList());
      this.mode = -1;
    }
    ScenarioMode.prototype.act = function() {};
    ScenarioMode.prototype.input = function(result) {
      switch (result) {
        case "up":
          return this.options.decrease();
        case "down":
          return this.options.increase();
        case "select":
          return this.mode = 0;
      }
    };
    ScenarioMode.prototype.update_draw = function() {
      return {
        options: this.options.options,
        pointer: this.options.pointer
      };
    };
    ScenarioMode.prototype.update_mode = function(n) {
      if (this.mode === -1) {
        return ScenarioMode.__super__.update_mode.call(this, n);
      } else {
        return {
          mode: this.mode,
          name: this.options.options[this.options.pointer]
        };
      }
    };
    return ScenarioMode;
  })();
  JobsManager = (function() {
    function JobsManager(map, units) {
      this.map = map;
      this.units = units;
      this.queue = [];
    }
    JobsManager.prototype.assigns = function() {
      var u, _i, _len, _ref, _results;
      if (this.queue.length === 0) {
        return -1;
      }
      _ref = this.units;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.job === null) {
          u.set_job(this.queue[0]);
          u.order = 0;
          this.queue[0].persons.push(u);
          this.queue.shift();
          if (this.queue.length === 0) {
            break;
          }
        }
      }
      return _results;
    };
    JobsManager.prototype.queuing = function() {
      var i, length, q, s, _i, _len, _ref, _results;
      _ref = this.map.stockpoints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        _results.push((function() {
          var _j, _len2, _ref2;
          if (s.check_assign() === false && s.queue === false) {
            i = 0;
            s.queue = true;
            length = this.queue.length;
            _ref2 = this.queue;
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              q = _ref2[_j];
              if (q.priority < s.priority) {
                this.queue.splice(i, 0, s);
                i += 1;
              }
            }
            if (this.queue.length === length) {
              return this.queue.push(s);
            }
          }
        }).call(this));
      }
      return _results;
    };
    return JobsManager;
  })();
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
    MsgManager.prototype.msg = function(unit_one, unit_two, msg) {
      var n;
      n = this.find_or_create_combat_relation(unit_one, unit_two);
      this.relations[n].add_msg(msg);
      this.last_status = n;
      return n;
    };
    MsgManager.prototype.get_last_update = function() {
      if (this.last_status === -1) {
        return -1;
      }
      return this.relations[this.last_status].last();
    };
    MsgManager.prototype.combat_death = function(object) {
      var msg;
      if (object === false) {
        return;
      }
      msg = object.actors[0] + " " + object.action + " " + object.actors[1];
      return this.msg(object.actors[0], object.actors[1], msg);
    };
    MsgManager.prototype.strike = function(object) {
      var msg, part;
      if (object === -1) {
        return;
      }
      part = object.part;
      msg = object.actors[0] + " strikes " + object.actors[1] + "'s " + part + "!";
      this.msg(object.actors[0], object.actors[1], msg);
      msg = object.actors[1] + "'s " + part + " suffers damage!";
      this.msg(object.actors[0], object.actors[1], msg);
      if (object.type === 1) {
        msg = object.actors[1] + " dies of " + object.cause;
        this.msg(object.actors[0], object.actors[1], msg);
      }
      switch (object.special) {
        case 0:
          msg = object.actors[1] + " losts some hand functionality";
          return this.msg(object.actors[0], object.actors[1], msg);
        case 1:
          msg = object.actors[1] + " suffers hand disability";
          return this.msg(object.actors[0], object.actors[1], msg);
        case 2:
          msg = object.actors[1] + " losts some leg functionality";
          return this.msg(object.actors[0], object.actors[1], msg);
        case 3:
          msg = object.actors[1] + " losts all leg functionality";
          return this.msg(object.actors[0], object.actors[1], msg);
      }
    };
    return MsgManager;
  })();
  Units = (function() {
    function Units(map) {
      this.map = map;
      this.units = [];
      this.msg_manager = new MsgManager();
      this.fatalities = 0;
    }
    Units.prototype.initialize_scenario = function(name) {
      switch (name) {
        case "combat":
          this.units.push(new Unit(10, 10, "Miya", 1));
          this.units.push(new Unit(10, 20, "John", 1));
          return this.units[0].target = this.units[1];
        case "leg_disability":
          this.units.push(new Unit(10, 10, "Can'tWalk", 1));
          this.units[0].body.leg = 2;
          return this.units[0].set_move(20, 20);
        default:
          this.units.push(new Unit(10, 10, "Killy", 1));
          return this.units.push(new Unit(12, 10, "Cibo", 1));
      }
    };
    Units.prototype.move = function() {
      var unit, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        unit = _ref[_i];
        if (unit.act_on_queue === false) {
          unit.set_action(this.map);
        }
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
      var unit, _i, _len, _ref;
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        unit = _ref[_i];
        if (unit.body.check_death() === true && unit.hostility === 0) {
          this.fatalities += 1;
        }
      }
      return this.units = (function() {
        var _j, _len2, _ref2, _results;
        _ref2 = this.units;
        _results = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          unit = _ref2[_j];
          if (unit.body.check_death() === false) {
            _results.push(unit);
          }
        }
        return _results;
      }).call(this);
    };
    Units.prototype.kills = function() {
      var k, u, _i, _len, _ref, _results;
      k = 0;
      _ref = this.units;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.hostility === 0) {
          _results.push(k += u.kills.length);
        }
      }
      return _results;
    };
    Units.prototype.killers = function() {
      var killers, u, _i, _len, _ref;
      killers = [];
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.hostility === 0) {
          killers.push({
            name: u.name,
            kills: u.kills.length
          });
        }
      }
      return killers;
    };
    Units.prototype.find_killer = function(name) {
      var u, _i, _len, _ref;
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.hostility === 0) {
          if (u.name === name) {
            return u.kills;
          }
        }
      }
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
  Stockpile = (function() {
    function Stockpile() {
      this.pile = 0;
      this.type = "crystal_stockpile";
    }
    return Stockpile;
  })();
  Arm = (function() {
    __extends(Arm, Part);
    function Arm(side) {
      this.side = side;
      Arm.__super__.constructor.call(this, "Arm");
      this.subparts.push(new Subpart("lower_arm", 3));
      this.subparts.push(new Subpart("upper_arm", 3));
      this.subparts.push(new Subpart("hand", 3));
      this.disabled = false;
    }
    Arm.prototype.interact = function() {
      var part;
      part = Arm.__super__.interact.call(this);
      if (part.type === 3) {
        part.damage = 1;
        this.disabled = true;
        return {
          type: 2,
          part: this.side + " " + part.name,
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
          if ((this.parts[1].disabled === true) && (this.parts[4].disabled === true)) {
            this.hand = 2;
            return "hand_destroy";
          } else if ((this.parts[1].disabled === true) || (this.parts[4].disabled === true)) {
            this.hand = 1;
            return "hand";
          }
          break;
        case 1:
          if ((this.parts[2].disabled === true) && (this.parts[3].disabled === true)) {
            this.leg = 2;
            return "leg_destroy";
          } else if ((this.parts[2].disabled === true) || (this.parts[3].disabled === true)) {
            this.leg = 1;
            return "leg";
          }
      }
    };
    return Body;
  })();
  CrystalPile = (function() {
    __extends(CrystalPile, Stockpile);
    function CrystalPile(x, y) {
      this.x = x;
      this.y = y;
      CrystalPile.__super__.constructor.call(this);
      this.name = "CrystalPile";
      this.persons = [];
      this.priority = 4;
      this.diameter = 5;
      this.size = 10;
      this.queue = false;
      this.orders = ["crystal_move", "crystal_gather", "move_to_drop"];
    }
    CrystalPile.prototype.collide = function() {
      return true;
    };
    CrystalPile.prototype.check_assign = function() {
      if (this.persons.length === 0) {
        return false;
      }
      return true;
    };
    CrystalPile.prototype.set_drop = function() {};
    return CrystalPile;
  })();
  CrystalTree = (function() {
    function CrystalTree() {
      this.pile = 50;
      this.type = "crystal_tree";
    }
    CrystalTree.prototype.collide = function() {
      return true;
    };
    return CrystalTree;
  })();
  Floor = (function() {
    function Floor() {
      this.type = "floor";
    }
    Floor.prototype.collide = function() {
      return false;
    };
    return Floor;
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
          cause: "head trauma"
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
    parts.push(new Arm("left"));
    parts.push(new Leg("left"));
    parts.push(new Leg("right"));
    parts.push(new Arm("right"));
    parts.push(new Torso());
    return parts;
  };
  Leg = (function() {
    __extends(Leg, Part);
    function Leg(side) {
      this.side = side;
      Leg.__super__.constructor.call(this, "Leg");
      this.subparts.push(new Subpart("lower_leg", 3));
      this.subparts.push(new Subpart("upper_leg", 3));
      this.disabled = false;
    }
    Leg.prototype.interact = function() {
      var part;
      part = Leg.__super__.interact.call(this);
      if (part.type === 3) {
        part.damage = 1;
        this.disabled = true;
        return {
          type: 2,
          part: this.side + " " + part.name,
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
      this.stockpoints = [];
      this.trees = [];
    }
    Map.prototype.generate = function() {
      var h, i, w, x, y, _ref, _ref2, _results;
      for (h = 0, _ref = this.map.length; 0 <= _ref ? h <= _ref : h >= _ref; 0 <= _ref ? h++ : h--) {
        if (h < this.map.length) {
          for (w = 0, _ref2 = this.map[h].length; 0 <= _ref2 ? w <= _ref2 : w >= _ref2; 0 <= _ref2 ? w++ : w--) {
            if (w < this.map[h].length) {
              if ((Math.random() * 10) > 5) {
                this.map[h][w] = new Floor();
              } else {
                this.map[h][w] = null;
              }
            }
          }
        }
      }
      _results = [];
      for (i = 0; i <= 10; i++) {
        if (i < 10) {
          x = Math.floor(Math.random() * 100);
          y = Math.floor(Math.random() * 100);
          _results.push(this.map[y][x] = new CrystalTree());
        }
      }
      return _results;
    };
    Map.prototype.result = function() {
      return this.map;
    };
    Map.prototype.add_stockpile = function(mouse) {
      var newpile, x, y;
      x = mouse.x;
      y = mouse.y;
      x = Math.floor(x / 20) - this.camera_x;
      y = Math.floor(y / 20) - this.camera_y;
      if (this.map[y][x] === null || this.map[y][x].collide() === false) {
        newpile = new CrystalPile(x, y);
        if (this.collision_detect(newpile) === false) {
          this.map[y][x] = newpile;
          return this.stockpoints.push(this.map[y][x]);
        }
      }
    };
    Map.prototype.collision_detect = function(newpile) {
      var pile, _i, _len, _ref;
      if (this.stockpoints.length === 0) {
        return false;
      }
      _ref = this.stockpoints;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pile = _ref[_i];
        if (circle_to_circle_collision(newpile, pile) === true) {
          return true;
        }
      }
      return false;
    };
    Map.prototype.calculate_nearest_tree = function(object) {
      var distance, shortest, t, target, _i, _len, _ref;
      shortest = 1000;
      target = null;
      _ref = this.trees;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        distance = distance_between_two_points(object, t);
        if (distance < shortest) {
          shortest = distance;
          target = t;
        }
      }
      return target;
    };
    Map.prototype.move_camera = function(x, y) {
      this.camera_x += x;
      return this.camera_y += y;
    };
    return Map;
  })();
  Mouse = (function() {
    function Mouse() {
      this.mode = 0;
      this.build = null;
      this.x = 0;
      this.y = 0;
    }
    Mouse.prototype.offset = function(x, y) {
      this.x += x;
      return this.y += y;
    };
    return Mouse;
  })();
  Relation = (function() {
    function Relation(actors) {
      this.actors = actors;
      this.msgs = [];
    }
    Relation.prototype.add_msg = function(msg) {
      return this.msgs.push(msg);
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
  scenarioList = function() {
    return ["combat", "hand_disability", "leg_disability"];
  };
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
      this.target = null;
      this.kills = [];
      this.inventory = [];
      this.job = null;
      this.queue = [];
      this.order = null;
      this.perform = null;
    }
    Unit.prototype.set_job = function(job) {
      this.job = job;
      return this.queue = this.queue.orders;
    };
    Unit.prototype.act_on_queue = function() {
      if (this.perform === this.order || this.queue.length === 0) {
        return true;
      }
      return false;
    };
    Unit.prototype.set_action = function(map) {
      var object;
      if (this.act_on_queue) {
        return;
      }
      switch (this.queue[this.order]) {
        case "move_to_drop":
          console.log("EE");
          this.set_move(this.job.x, this.job.y);
          break;
        case "crystal_move":
          console.log("DEE");
          object = map.calculate_nearest_tree();
          this.set_move(object.x, object.y);
      }
      return this.perform = this.order;
    };
    Unit.prototype.set_move = function(x, y) {
      this.goal_x = x;
      return this.goal_y = y;
    };
    Unit.prototype.move = function() {
      if (this.body.leg === 2) {
        return;
      }
      if ((this.x - this.goal_x) < 0) {
        this.x = this.x + 1;
        return;
      } else if ((this.x - this.goal_x) > 0) {
        this.x = this.x - 1;
        return;
      }
      if ((this.y - this.goal_y) < 0) {
        this.y = this.y + 1;
        return;
      } else if ((this.y - this.goal_y) > 0) {
        this.y = this.y - 1;
        return;
      }
      if (this.y - this.goal_y === 0 && this.x - this.goal_x === 0) {
        if (this.order !== null) {
          return this.order += 1;
        }
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
      if (this.target === null || (this.body.hand === 2)) {
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
        this.kills.push(target.name);
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
        cause: damage.cause,
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
              break;
            case "leg_destroy":
              object.special = 3;
          }
      }
      return object;
    };
    return Unit;
  })();
  buildMenuDraw = function(p5) {
    this.p5 = p5;
    this.p5.fill(255, 0, 0);
    this.p5.text("Build Menu", 715, 115);
    this.p5.fill(255, 255, 0);
    return this.p5.text("c - crystal pile", 705, 140);
  };
  combatLogMenuDraw = function(p5) {
    this.p5 = p5;
    return scrollDraw(this.p5, false);
  };
  combatMainMenuDraw = function(p5) {
    this.p5 = p5;
    this.p5.textFont("Monospace", 12);
    scrollDraw(this.p5, true);
    return this.p5.text("k - kill lists", 300, 580);
  };
  gameMenuDraw = function(p5) {
    this.p5 = p5;
    this.p5.fill(255, 0, 0);
    this.p5.text("Game Menu", 715, 115);
    this.p5.fill(255, 255, 0);
    return this.p5.text("b - build", 705, 140);
  };
  killsDraw = function(kills, p5) {
    this.p5 = p5;
    this.p5.textFont("Monospace", 12);
    return this.p5.text("Kills by Colonists Thus Far: " + kills, 400, 12);
  };
  mapDraw = (function() {
    function mapDraw(p5, width, height) {
      this.p5 = p5;
      this.width = width;
      this.height = height;
    }
    mapDraw.prototype.draw = function(map) {
      var height, object, results, width, x, y, _ref, _results;
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
                x = 20 * (width + map.camera_x);
                y = 20 * (height + map.camera_y);
                object = results[height][width];
                this.p5.stroke(255, 255, 255);
                if (object === null) {
                  this.p5.noFill();
                } else {
                  switch (object.type) {
                    case "floor":
                      this.p5.fill();
                      break;
                    case "crystal_tree":
                      this.p5.fill(0, 0, 255);
                      break;
                    case "crystal_stockpile":
                      this.p5.noFill();
                      this.p5.stroke(135, 206, 255);
                      this.p5.ellipse(x + 10, y + 10, 100, 100);
                      this.p5.fill(135, 206, 255);
                  }
                }
                _results2.push(this.p5.rect(x, y, 20, 20));
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
  menuDraw = function(p5) {
    this.p5 = p5;
    this.p5.fill(0, 0, 0);
    this.p5.stroke(255, 255, 0);
    return this.p5.rect(700, 100, 100, 400);
  };
  messageDraw = function(p5, msg) {
    p5.fill(0);
    p5.rect(0, 580, 800, 20);
    p5.fill(255, 0, 0);
    return p5.text(msg, 5, 595);
  };
  mouseDraw = function(p5, object, camera_x, camera_y) {
    var location_x, location_y, x, y;
    this.p5 = p5;
    x = this.p5.mouseX;
    y = this.p5.mouseY;
    location_x = Math.floor(x / 20);
    location_y = Math.floor(y / 20);
    switch (object.mode) {
      case 1:
        this.p5.noStroke();
        this.p5.fill(128, 128, 128);
        this.p5.rect(location_x * 20, location_y * 20, 20, 20);
        this.p5.fill(255, 0, 0);
        return this.p5.text("Crystal Pile", x - 5, y - 5);
    }
  };
  scrollDraw = function(p5, select) {
    this.p5 = p5;
    this.p5.text("s - scroll down", 0, 580);
    this.p5.text("w - scroll up", 100, 580);
    if (select === true) {
      return this.p5.text("return/enter - select", 200, 580);
    }
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
      var k, msg, name, _i, _j, _len, _len2, _ref, _ref2;
      this.p5.background(0);
      switch (object.type) {
        case 0:
          this.texts.draw(object.summaries, object.pointer);
          killsDraw(object.kills, this.p5);
          combatMainMenuDraw(this.p5);
          return this.p5.text("Colonists Dead Thus Far: " + object.fatalities, 400, 25);
        case 1:
          return this.texts.draw(object.log, object.pointer);
        case 2:
          msg = [];
          _ref = object.killers;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            k = _ref[_i];
            msg.push(k.name + ": " + k.kills);
          }
          return this.texts.draw(msg, object.pointer);
        case 3:
          msg = [];
          this.p5.text(object.name + " killed about " + object.kills.length + "beings", 20, 12);
          this.p5.text("Kill list:", 30, 20);
          _ref2 = object.kills;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            name = _ref2[_j];
            msg.push(name);
          }
          this.texts.offset_y = 30;
          return this.texts.draw(msg, object.pointer);
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
        case 97:
          return "previous";
        case 107:
          return "kills";
      }
    };
    return CombatReportKeyMinorMode;
  })();
  CombatReportMinorMode = (function() {
    function CombatReportMinorMode(parent) {
      this.parent = parent;
      this.msg = [];
      this.options = new TextOptions();
      this.state = -1;
    }
    CombatReportMinorMode.prototype.update = function() {
      var r, _i, _len, _ref, _results;
      this.options.clean();
      switch (this.state) {
        case -1:
          _ref = this.parent.units.msg_manager.relations;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            r = _ref[_i];
            _results.push(this.options.add_text([r.summary()]));
          }
          return _results;
          break;
        case 0:
          return this.options.add_text(this.parent.units.msg_manager.relations[this.unit].msgs);
        case 1:
          return this.options.add_text(this.parent.units.killers());
        case 2:
          return this.options.add_text(this.parent.units.find_killer(this.name));
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
          switch (this.state) {
            case -1:
              this.state = 0;
              this.unit = this.options.pointer;
              return this.update();
            case 1:
              this.state = 2;
              this.name = this.options.options[this.options.pointer].name;
              return this.update();
          }
          break;
        case "back":
          return this.parent.state = -1;
        case "previous":
          if (this.state === 0 || this.state === 1) {
            this.state = -1;
          } else if (this.state === 2) {
            this.state = 1;
          }
          this.options.pointer = 0;
          return this.update();
        case "kills":
          this.state = 1;
          this.options.pointer = 0;
          return this.update();
      }
    };
    CombatReportMinorMode.prototype.input_info = function(msg) {
      this.msg = msg;
    };
    CombatReportMinorMode.prototype.update_draw = function() {
      switch (this.state) {
        case -1:
          return {
            summaries: this.options.options,
            pointer: this.options.pointer,
            state: this.parent.state,
            type: 0,
            kills: this.parent.units.kills(),
            fatalities: this.parent.units.fatalities
          };
        case 0:
          return {
            log: this.options.options,
            pointer: this.options.pointer,
            state: this.parent.state,
            type: 1
          };
        case 1:
          return {
            killers: this.options.options,
            pointer: this.options.pointer,
            state: this.parent.state,
            type: 2
          };
        case 2:
          return {
            name: this.name,
            kills: this.options.options,
            pointer: this.options.pointer,
            state: this.parent.state,
            type: 3
          };
      }
    };
    return CombatReportMinorMode;
  })();
  gameMinorModeList = function() {
    return ["CombatReport"];
  };
  menuMinorModeList = function() {
    return [];
  };
}).call(this);
