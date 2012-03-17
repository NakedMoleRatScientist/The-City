(function() {
  var Arm, Body, Camera, Collision, CombatRelation, CombatReportDrawMinorMode, CombatReportKeyMinorMode, CombatReportMinorMode, Crystal, CrystalStock, CrystalTree, DebugTile, DrawMinorModeManager, DrawMode, DrawModeManager, FloatingMsgs, Floor, GameDrawMode, GameKeyMode, GameMode, GenerateMap, Head, HelpDrawMinorMode, HelpKeyMinorMode, HelpMinorMode, Human, Item, Job, JobsManager, KeyMinorModeManager, KeyMode, KeyModeManager, Leg, Lightboar, Log, Map, MapDestinate, MapSketch, MenuDrawMode, MenuKeyMode, MenuMode, MinorModeManager, Mode, ModeManager, Mouse, MsgManager, Part, Pathfinder, RadioButton, Rect, Relation, ResourceRelation, ScenarioDrawMode, ScenarioInitialize, ScenarioKeyMode, ScenarioMode, ScenarioTester, Stockpile, Subpart, TextOptions, TextOptionsDraw, Timber, Timer, Torso, Tree, Unit, Units, Wall, Wood, approachesList, backgroundMenuDraw, boar_body, boxedText, buildMenuDraw, build_rect, circle_to_circle_collision, combat, combatLogMenuDraw, combatMainMenuDraw, crystalDraw, crystalStockpileDraw, crystalTreeDraw, cuttingDown, debug_draw, determineCameraRedraw, determineCollisionRedraw, determineRectDraw, distance_between_two_points, drawDirtyRects, floatText, floorDraw, frameRateDraw, fullTestBoars, gameMenuDraw, gameMinorModeList, handDisabilityCombat, handDisabilityGathering, helpMenuDraw, human_body, initializeDrawMinorModes, initializeDrawModes, initializeKeyMinorModes, initializeKeyModes, initializeMinorModes, initializeModes, instructionDraw, killsDraw, legDisability, logDraw, mapDraw, mapViewer, menu, menuDraw, menuMinorModeList, menuTitleText, messageDraw, modeList, mouseDraw, nearest_edge, nearest_object, normalScenario, pathfinding, pigInvasion, pointToRectCollision, point_circle_collision, random_number, rect_to_many_rect_collision, rect_to_rect_collision, scenarioList, scrollDraw, terrainTest, timberDraw, timberStock, timberStockpileDraw, titleDraw, translateIntoDrawCoord, treeDraw, unitCombat, unitDraw, unitsDraw, unpathable1, unpathable2, wallDraw,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  circle_to_circle_collision = function(one, two) {
    var combined_radii, distance, one_radius, two_radius;
    distance = distance_between_two_points(one, two);
    one_radius = one.diameter / 2;
    two_radius = two.diameter / 2;
    combined_radii = one_radius + two_radius;
    if (distance < combined_radii) return true;
    return false;
  };

  approachesList = function(location) {
    var approaches;
    approaches = [];
    if (location.x - 1 > 0) {
      approaches.push({
        x: location.x - 1,
        y: location.y
      });
    }
    if (location.x + 1 < 99) {
      approaches.push({
        x: location.x + 1,
        y: location.y
      });
    }
    if (location.y - 1 > 0) {
      approaches.push({
        x: location.x,
        y: location.y - 1
      });
    }
    if (location.y + 1 < 99) {
      approaches.push({
        x: location.x,
        y: location.y + 1
      });
    }
    return approaches;
  };

  KeyModeManager = (function() {

    function KeyModeManager(p5) {
      this.p5 = p5;
      this.modes = initializeKeyModes(this.p5);
    }

    KeyModeManager.prototype.key_pressed = function(logic) {
      var state;
      state = (logic.update_draw()).state;
      if (state === null) return this.modes[logic.n].key_pressed();
      return this.modes[logic.n].key_pressed(state);
    };

    KeyModeManager.prototype.mouse_pressed = function(logic) {
      var state;
      state = (logic.update_draw()).state;
      if (state === null) return this.modes[logic.n].mouse_pressed();
      return this.modes[logic.n].mouse_pressed(state);
    };

    return KeyModeManager;

  })();

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

    Mode.prototype.mouse_input = function(result) {};

    return Mode;

  })();

  menu = function(p5) {
    p5.setup = function() {
      p5.size(800, 600);
      p5.background(0);
      this.fps = 50;
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
      return this.draw_manager.input(this.logic_manager, result);
    };
    p5.logic = function() {
      this.logic_manager.act();
      return this.draw_manager.draw(this.logic_manager);
    };
    return p5.draw = function() {
      return p5.logic();
    };
  };

  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    canvas.focus();
    return processing = new Processing(canvas, menu);
  });

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

  pointToRectCollision = function(compare, against) {
    var height, width, x, y;
    width = against.x + against.width;
    height = against.y + against.height;
    x = compare.x >= against.x && compare.x <= width;
    y = compare.y >= against.y && compare.y <= height;
    if (x && y) return true;
    return false;
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

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  random_number = function(size) {
    return Math.floor(Math.random() * size);
  };

  nearest_object = function(object, list) {
    var distance, l, shortest, target, _i, _len;
    shortest = 1000;
    target = null;
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      l = list[_i];
      distance = distance_between_two_points(object, l);
      if (distance < shortest) {
        shortest = distance;
        target = l;
      }
    }
    return target;
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

  nearest_edge = function(object) {
    var list;
    list = [];
    list.push({
      x: 0,
      y: object.y
    });
    list.push({
      x: 99,
      y: object.y
    });
    list.push({
      x: object.x,
      y: 99
    });
    list.push({
      x: object.x,
      y: 0
    });
    return nearest_object(object, list);
  };

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

  Timer = (function() {

    function Timer() {
      var event;
      event = setInterval(this.act, 1000);
      this.seconds = 0;
    }

    Timer.prototype.act = function() {
      return this.seconds += 1;
    };

    return Timer;

  })();

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

  rect_to_many_rect_collision = function(individual, many) {
    var against, _i, _len;
    for (_i = 0, _len = many.length; _i < _len; _i++) {
      against = many[_i];
      if (rect_to_rect_collision(individual, against)) return true;
    }
    return false;
  };

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

    TextOptions.prototype.selected = function() {
      return this.options[this.pointer];
    };

    return TextOptions;

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
      var object;
      object = this.modes[this.n].input(result);
      if (object.change !== false) return this.switch_mode(object);
    };

    ModeManager.prototype.update_draw = function() {
      return this.modes[this.n].update_draw();
    };

    ModeManager.prototype.game_mode = function(name) {
      this.name = name;
      this.modes[0].scenario.create(this.name);
      if (this.name === "game") return this.modes[0].tester.status = false;
    };

    ModeManager.prototype.mouse_input = function(result) {
      return this.modes[this.n].mouse_input(result);
    };

    ModeManager.prototype.switch_mode = function(object) {
      var n;
      n = object.change;
      if (n === 0 && this.n === 1) {
        this.game_mode("game");
      } else if (n === 0 && this.n === 2) {
        this.game_mode(object.name);
      }
      return this.n = n;
    };

    return ModeManager;

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

  FloatingMsgs = (function() {

    function FloatingMsgs() {
      this.msgs = [];
    }

    FloatingMsgs.prototype.create = function(msg, time, x, y) {
      x *= 20;
      y *= 20;
      return this.msgs.push(new FloatText(msg, time, x, y));
    };

    FloatingMsgs.prototype.draw = function(p5) {
      var dirty, m, _i, _len, _ref, _results;
      dirty = [];
      _ref = this.msgs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        p5.text(m, m.x, m.y);
        m.x += m.dir.x * 20;
        m.y += m.dir.y * 20;
        _results.push(m.time -= 1);
      }
      return _results;
    };

    return FloatingMsgs;

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

  MinorModeManager = (function() {

    function MinorModeManager(name, parent) {
      this.parent = parent;
      this.modes = initializeMinorModes(name, this.parent);
    }

    MinorModeManager.prototype.act = function() {
      if (this.parent.state === -1) return;
      return this.modes[this.parent.state].act();
    };

    MinorModeManager.prototype.update = function() {
      return this.modes[this.parent.state].update();
    };

    MinorModeManager.prototype.input = function(result) {
      if (this.parent.state === -1) return;
      return this.modes[this.parent.state].input(result);
    };

    MinorModeManager.prototype.update_draw = function() {
      if (this.parent.state === -1) return -1;
      return this.modes[this.parent.state].update_draw();
    };

    return MinorModeManager;

  })();

  distance_between_two_points = function(one, two) {
    var square_x, square_y, substract_x, substract_y;
    substract_x = one.x - two.x;
    substract_y = one.y - two.y;
    square_x = substract_x * substract_x;
    square_y = substract_y * substract_y;
    return Math.sqrt(square_x + square_y);
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

  rect_to_rect_collision = function(one, two) {
    var one_x, one_x2, one_y, one_y2, two_x, two_x2, two_y, two_y2;
    one_x = one.x;
    one_x2 = two.x + one.width;
    one_y = one.y;
    one_y2 = one.y + one.height;
    two_x = two.x;
    two_x2 = two.x + two.width;
    two_y = two.y;
    two_y2 = two.y + two.height;
    if ((one_x2 >= two_x && one_x <= two_x2) && (one_y2 >= two_y && one_y <= two_y2)) {
      return true;
    }
    return false;
  };

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

  DrawMode = (function() {

    function DrawMode(name, p5) {
      this.minor_draw = new DrawMinorModeManager(name, p5);
    }

    DrawMode.prototype.draw = function(object) {
      if (object.state === -1) return;
      return this.minor_draw.draw(object.state, object);
    };

    DrawMode.prototype.input = function(result) {};

    return DrawMode;

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

  floatText = (function() {

    function floatText(msg, time, x, y, dir) {
      this.msg = msg;
      this.time = time;
      this.x = x;
      this.y = y;
      this.dir = dir;
    }

    return floatText;

  })();

  menuDraw = function(toggle, p5) {
    switch (toggle) {
      case 0:
        backgroundMenuDraw(p5);
        return gameMenuDraw(p5);
      case 1:
        backgroundMenuDraw(p5);
        return buildMenuDraw(p5);
    }
  };

  backgroundMenuDraw = function(p5) {
    this.p5 = p5;
    this.p5.fill(0, 0, 0);
    this.p5.stroke(255, 255, 0);
    return this.p5.rect(700, 100, 100, 400);
  };

  mapDraw = function(map, p5) {
    var d, delay, end_x, end_y, height, item, objects, result, results, width, x, y, _i, _j, _len, _len2, _ref, _ref2, _results;
    p5.background(0);
    results = map.map;
    end_y = map.camera.y + 30 - 1;
    end_x = map.camera.x + 40 - 1;
    delay = [];
    for (height = _ref = map.camera.y; _ref <= end_y ? height <= end_y : height >= end_y; _ref <= end_y ? height++ : height--) {
      for (width = _ref2 = map.camera.x; _ref2 <= end_x ? width <= end_x : width >= end_x; _ref2 <= end_x ? width++ : width--) {
        x = 20 * (width - map.camera.x);
        y = 20 * (height - map.camera.y);
        objects = results[height][width];
        p5.noStroke();
        if (objects.length !== 0) {
          for (_i = 0, _len = objects.length; _i < _len; _i++) {
            item = objects[_i];
            result = determineRectDraw(item, x, y, p5);
            if (result !== true) delay.push(result);
          }
        }
      }
    }
    _results = [];
    for (_j = 0, _len2 = delay.length; _j < _len2; _j++) {
      d = delay[_j];
      _results.push(crystalStockpileDraw(p5, d.x, d.y));
    }
    return _results;
  };

  determineRectDraw = function(location, x, y, p5) {
    switch (location.name) {
      case "floor":
        floorDraw(p5, x, y);
        break;
      case "crystal_tree":
        crystalTreeDraw(p5, x, y);
        break;
      case "crystal_stockpile":
        return {
          x: x,
          y: y
        };
      case "crystal":
        crystalDraw(p5, x, y, location.items, location.background);
        break;
      case "wall":
        wallDraw(p5, x, y);
        break;
      case "debug":
        debug_draw(p5, x, y);
        break;
      case "tree":
        treeDraw(p5, x, y);
        break;
      case "timber_stockpile":
        timberStockpileDraw(p5, x, y);
        break;
      case "timber":
        timberDraw(p5, x, y);
        break;
      case "log":
        logDraw(p5, x, y);
    }
    return true;
  };

  boxedText = function(p5, x, y, text) {
    var t;
    t = p5.text(text, x, y);
    p5.noFill();
    p5.stroke();
    return p5.rect(x - 3, y - p5.textAscent() - 3, p5.textWidth(text) + 3, p5.textAscent() + 3);
  };

  messageDraw = function(p5, msg) {
    p5.fill(0);
    p5.rect(0, 580, 800, 20);
    p5.fill(255, 0, 0);
    return p5.text(msg, 5, 595);
  };

  titleDraw = function(p5) {
    p5.textFont("monospace", 30);
    return p5.text("The City", 300, 100);
  };

  determineCollisionRedraw = function(p5, dirty, map) {
    var coord, d, location, rect, s, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = dirty.length; _i < _len; _i++) {
      d = dirty[_i];
      coord = translateIntoDrawCoord(d, map);
      _results.push((function() {
        var _j, _len2, _ref, _results2;
        _ref = map.stockpoints;
        _results2 = [];
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          s = _ref[_j];
          location = translateIntoDrawCoord(s, map);
          rect = {
            x: location.x - 40,
            y: location.y - 40,
            width: 100,
            height: 100
          };
          if (pointToRectCollision(coord, rect) === true) {
            if (s.name === "crystal_stockpile") {
              _results2.push(crystalStockpileDraw(p5, location.x, location.y));
            } else {
              _results2.push(timberStockpileDraw(p5, location.x, location.y));
            }
          } else {
            _results2.push(void 0);
          }
        }
        return _results2;
      })());
    }
    return _results;
  };

  timberDraw = function(p5, x, y) {
    p5.stroke(0, 100, 0);
    p5.fill(0, 100, 0);
    return p5.rect(x, y + 5, 19, 5);
  };

  helpMenuDraw = function(p5) {
    var height, x, y;
    this.p5 = p5;
    x = 705;
    y = 140;
    height = 15;
    menuTitleText(this.p5, "Help Menu");
    this.p5.fill(255, 255, 0);
    return this.p5.text("q - back", x, y);
  };

  timberStockpileDraw = function(p5, x, y) {
    p5.noFill();
    p5.stroke(0, 100, 0);
    p5.rect(x - 39, y - 39, 99, 99);
    p5.fill(0, 100, 0);
    return p5.rect(x, y, 20, 20);
  };

  unitDraw = function(p5, unit, x, y) {
    switch (unit.gender) {
      case 0:
        p5.fill(0, 0, 255);
        break;
      case 1:
        p5.fill(255, 192, 203);
    }
    switch (unit.type) {
      case 1:
        return p5.text("H", x, y);
      case 2:
        return p5.text("B", x, y);
    }
  };

  mapViewer = function(p5, x, y, map) {
    return p5.rect(700, 400, 100, 100);
  };

  combatMainMenuDraw = function(p5) {
    this.p5 = p5;
    this.p5.textFont("Monospace", 12);
    scrollDraw(this.p5, true);
    return this.p5.text("k - kill lists", 345, 580);
  };

  debug_draw = function(p5, x, y) {
    p5.noStroke();
    p5.fill(255, 0, 0);
    return p5.rect(x, y, 20, 20);
  };

  combatLogMenuDraw = function(p5) {
    this.p5 = p5;
    return scrollDraw(this.p5, false);
  };

  buildMenuDraw = function(p5) {
    var height, x, y;
    this.p5 = p5;
    x = 705;
    y = 140;
    height = 15;
    menuTitleText(this.p5, "Build Menu");
    this.p5.fill(255, 255, 0);
    this.p5.text("c - crystal pile", x, y);
    this.p5.text("t - tree pile", x, y += height);
    this.p5.text("m - hide menu", x, y += height);
    return this.p5.text("q - back", x, y += height);
  };

  treeDraw = function(p5, x, y) {
    p5.fill(0, 100, 0);
    return p5.ellipse(x + 10, y + 10, 10, 10);
  };

  instructionDraw = function(p5) {
    this.p5 = p5;
    boxedText(this.p5, 500, 100, "w");
    this.p5.text(" - up", 515, 100);
    boxedText(this.p5, 500, 120, "s");
    this.p5.text(" - down", 515, 120);
    boxedText(this.p5, 600, 110, "Enter");
    return this.p5.text(" - select", 650, 110);
  };

  mouseDraw = function(p5, mouse, units, map) {
    var cam_x, cam_y, item, msg, u, width, x, y, _i, _len;
    this.p5 = p5;
    x = Math.floor(this.p5.mouseX / 20);
    y = Math.floor(this.p5.mouseY / 20);
    width = 0;
    item = false;
    switch (mouse.mode) {
      case 0:
        cam_x = x + map.camera.x;
        cam_y = y + map.camera.y;
        for (_i = 0, _len = units.length; _i < _len; _i++) {
          u = units[_i];
          if (u.x === cam_x && u.y === cam_y) {
            item = u;
            break;
          }
        }
        if (item === false) {
          item = map.select_last(x + map.camera.x, y + map.camera.y);
        }
        msg = item.name;
        if (item !== false) {
          this.p5.noStroke();
          this.p5.fill(255, 0, 0);
          if (item.name === "crystal" || item.name === "timber") {
            msg = item.name + " : " + item.items;
          }
          msg += " (" + cam_x + "," + cam_y + ")";
        }
        break;
      case 1:
        build_rect(this.p5, x, y);
        if (mouse.build === "crystal") {
          msg = "Crystal Pile";
        } else {
          msg = "Wood Pile";
        }
    }
    this.p5.text(msg, x * 20, y * 20 - 3);
    return Math.ceil(width / 20);
  };

  drawDirtyRects = function(dirty, map, p5) {
    var coord, d, delay, item, location, result, _i, _j, _k, _len, _len2, _len3, _results;
    delay = [];
    for (_i = 0, _len = dirty.length; _i < _len; _i++) {
      d = dirty[_i];
      location = map.map[d.y][d.x];
      coord = translateIntoDrawCoord(d, map);
      p5.noStroke();
      p5.fill(0);
      p5.rect(coord.x, coord.y, 20, 20);
      for (_j = 0, _len2 = location.length; _j < _len2; _j++) {
        item = location[_j];
        result = determineRectDraw(item, coord.x, coord.y, p5);
        if (result !== true) delay.push(result);
      }
    }
    _results = [];
    for (_k = 0, _len3 = delay.length; _k < _len3; _k++) {
      d = delay[_k];
      _results.push(crystalStockpileDraw(p5, d.x, d.y));
    }
    return _results;
  };

  wallDraw = function(p5, x, y) {
    p5.noStroke();
    p5.fill(49, 79, 79);
    return p5.rect(x, y, 20, 20);
  };

  killsDraw = function(kills, p5) {
    this.p5 = p5;
    this.p5.textFont("Monospace", 12);
    return this.p5.text("Kills by Colonists Thus Far: " + kills, 400, 12);
  };

  crystalTreeDraw = function(p5, x, y) {
    p5.fill(0, 0, 255);
    return p5.rect(x, y, 20, 20);
  };

  translateIntoDrawCoord = function(object, map) {
    var transform;
    return transform = {
      x: (object.x - map.camera.x) * 20,
      y: (object.y - map.camera.y) * 20
    };
  };

  menuTitleText = function(p5, name) {
    this.p5 = p5;
    this.p5.fill(255, 0, 0);
    return this.p5.text(name, 715, 115);
  };

  logDraw = function(p5, x, y) {
    p5.stroke(0, 100, 0);
    p5.fill(0);
    return p5.rect(x + 5, y, 10, 20);
  };

  frameRateDraw = function(p5) {
    this.p5 = p5;
    this.p5.fill(0);
    this.p5.noStroke();
    this.p5.rect(200, 0, 50, 20);
    this.p5.fill(255);
    this.p5.textSize("monospace", 15);
    return this.p5.text("FPS: " + Math.floor(this.p5.__frameRate), 200, 15);
  };

  determineCameraRedraw = function(map, old_camera) {
    if (old_camera.x === null || old_camera.y === null) {
      return true;
    } else if (old_camera.x !== map.camera.x || old_camera.y !== map.camera.y) {
      return true;
    }
  };

  crystalDraw = function(p5, x, y, fullness, background) {
    fullness *= 3;
    if (background === "floor") floor_draw(p5, x, y);
    p5.stroke(255);
    p5.fill(fullness % 255 / 10, fullness % 255 / 10, fullness % 255);
    return p5.triangle(x, y + 20, x + 10, y, x + 20, y + 20);
  };

  build_rect = function(p5, x, y) {
    p5.noStroke();
    p5.fill(128, 128, 128);
    p5.rect(x * 20, y * 20, 20, 20);
    return p5.fill(255, 0, 0);
  };

  crystalStockpileDraw = function(p5, x, y) {
    p5.noFill();
    p5.stroke(135, 206, 255);
    p5.rect(x - 39, y - 39, 99, 99);
    p5.fill(135, 206, 255);
    return p5.rect(x, y, 20, 20);
  };

  gameMenuDraw = function(p5) {
    var height, x, y;
    this.p5 = p5;
    x = 705;
    y = 140;
    height = 15;
    menuTitleText(this.p5, "Game Menu");
    this.p5.fill(255, 255, 0);
    this.p5.text("b - build", x, y);
    this.p5.text("h - help", x, y += height);
    return this.p5.text("m - hide menu", x, y += height);
  };

  floorDraw = function(p5, x, y) {
    p5.noStroke();
    p5.fill(190, 190, 190);
    return p5.rect(x, y, 20, 20);
  };

  scrollDraw = function(p5, select) {
    this.p5 = p5;
    this.p5.text("s - scroll down", 0, 580);
    this.p5.text("w - scroll up", 100, 580);
    if (select === true) return this.p5.text("return/enter - select", 200, 580);
  };

  unitsDraw = function(p5, units, map) {
    var unit, x, y, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = units.length; _i < _len; _i++) {
      unit = units[_i];
      x = (unit.x - map.camera.x) * 20 + 5;
      y = (unit.y - map.camera.y) * 20 + 20;
      _results.push(unitDraw(p5, unit, x, y));
    }
    return _results;
  };

  ScenarioMode = (function(_super) {

    __extends(ScenarioMode, _super);

    function ScenarioMode() {
      this.options = new TextOptions();
      this.options.add_text(scenarioList());
      this.mode = -1;
    }

    ScenarioMode.prototype.act = function() {};

    ScenarioMode.prototype.input = function(result) {
      switch (result) {
        case "up":
          this.options.decrease();
          break;
        case "down":
          this.options.increase();
          break;
        case "select":
          return {
            change: 0,
            name: this.options.selected()
          };
      }
      return {
        change: false
      };
    };

    ScenarioMode.prototype.update_draw = function() {
      return {
        options: this.options.options,
        pointer: this.options.pointer
      };
    };

    return ScenarioMode;

  })(Mode);

  ScenarioDrawMode = (function(_super) {

    __extends(ScenarioDrawMode, _super);

    function ScenarioDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptionsDraw(this.p5, 30, 12, 12);
    }

    ScenarioDrawMode.prototype.draw = function(object) {
      this.p5.background(0);
      this.texts.draw(object.options, object.pointer);
      return instructionDraw(this.p5);
    };

    ScenarioDrawMode.prototype.input = function(result) {};

    return ScenarioDrawMode;

  })(DrawMode);

  MenuMode = (function(_super) {

    __extends(MenuMode, _super);

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
          this.options.decrease();
          break;
        case "down":
          this.options.increase();
          break;
        case "select":
          if (this.options.pointer === 0) {
            return {
              change: 0
            };
          } else {
            return {
              change: 2
            };
          }
      }
      return {
        change: false
      };
    };

    MenuMode.prototype.update_draw = function(n) {
      return {
        options: this.options.options,
        pointer: this.options.pointer,
        state: null
      };
    };

    return MenuMode;

  })(Mode);

  GameKeyMode = (function(_super) {

    __extends(GameKeyMode, _super);

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
            case 104:
              return "help";
            case 113:
              return "back";
            case 114:
              return "report";
            case 115:
              return "up";
            case 116:
              return "tree";
            case 117:
              return "undo";
            case 119:
              return "down";
            case 109:
              return "menu";
            default:
              return false;
          }
      }
      return GameKeyMode.__super__.key_pressed.call(this, state);
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

  })(KeyMode);

  MenuDrawMode = (function() {

    function MenuDrawMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptionsDraw(this.p5, 300, 250, 18);
      this.size = 0;
    }

    MenuDrawMode.prototype.draw = function(object) {
      this.p5.background(0);
      frameRateDraw(this.p5);
      titleDraw(this.p5);
      this.texts.draw(object.options, object.pointer);
      return instructionDraw(this.p5);
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

  GameDrawMode = (function(_super) {

    __extends(GameDrawMode, _super);

    function GameDrawMode(p5) {
      this.p5 = p5;
      this.dirty_rects = [];
      this.dirty_menu = -1;
      this.redraw = false;
      this.camera = {
        x: null,
        y: null
      };
      this.mouse_width = 0;
      GameDrawMode.__super__.constructor.call(this, "game", this.p5);
    }

    GameDrawMode.prototype.draw = function(object) {
      var i, map, mouse, msg, unit, units, x, y, _i, _len;
      switch (object.state) {
        case -1:
          map = object.map;
          units = object.units;
          mouse = object.mouse;
          msg = object.msg;
          if (determineCameraRedraw(map, this.camera) || this.redraw === true) {
            mapDraw(map, p5);
            menuDraw(object.menu, this.p5);
            this.redraw = false;
          }
          drawDirtyRects(this.dirty_rects, map, this.p5);
          unitsDraw(this.p5, units, map);
          determineCollisionRedraw(this.p5, this.dirty_rects, map);
          menuDraw(object.menu, this.p5);
          if (this.dirty_menu !== object.menu) {
            mapDraw(map, p5);
            menuDraw(object.menu, this.p5);
          }
          this.dirty_rects = [];
          for (_i = 0, _len = units.length; _i < _len; _i++) {
            unit = units[_i];
            this.dirty_rects.push({
              x: unit.x,
              y: unit.y
            });
          }
          this.dirty_rects = this.dirty_rects.concat(map.redraw);
          map.redraw = [];
          x = Math.floor(this.p5.mouseX / 20) + map.camera.x;
          y = Math.floor(this.p5.mouseY / 20) + map.camera.y;
          this.dirty_rects.push({
            x: x,
            y: y
          });
          if (y > 0) {
            for (i = 0; i <= 30; i++) {
              if (x + i < 100) {
                this.dirty_rects.push({
                  x: x + i,
                  y: y - 1
                });
              }
            }
          }
          this.camera.x = map.camera.x;
          this.camera.y = map.camera.y;
          this.dirty_menu = object.menu;
          this.mouse_width = mouseDraw(this.p5, object.mouse, units, map);
          frameRateDraw(this.p5);
          if (msg !== -1) messageDraw(this.p5, msg);
          break;
        default:
          this.redraw = true;
      }
      return GameDrawMode.__super__.draw.call(this, object);
    };

    GameDrawMode.prototype.input = function(result) {
      return GameDrawMode.__super__.input.call(this, result);
    };

    return GameDrawMode;

  })(DrawMode);

  modeList = function() {
    return ["Game", "Menu", "Scenario"];
  };

  GameMode = (function(_super) {

    __extends(GameMode, _super);

    function GameMode() {
      this.map = new Map(100, 100);
      this.msgs = new MsgManager();
      this.units = new Units(this.map, this.msgs);
      this.menu = 0;
      this.mouse = new Mouse();
      this.jobs = new JobsManager(this.map, this.units.units);
      this.scenario = new ScenarioInitialize(this.units, this.map);
      this.tester = new ScenarioTester(this);
      this.time = new Timer();
      GameMode.__super__.constructor.call(this, "game");
    }

    GameMode.prototype.reset = function() {
      this.map.reset();
      this.units.reset();
      this.jobs.reset();
      return this.scenario.run();
    };

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
          case "down":
            this.map.camera.move(0, -1);
            break;
          case "up":
            this.map.camera.move(0, 1);
            break;
          case "right":
            this.map.camera.move(-1, 0);
            break;
          case "left":
            this.map.camera.move(1, 0);
            break;
          case "crystal":
            if (this.menu === 1) {
              this.mouse.mode = 1;
              this.mouse.build = "crystal";
            }
            break;
          case "tree":
            if (this.menu === 1) {
              this.mouse.mode = 1;
              this.mouse.build = "tree";
            }
            break;
          case "report":
            this.state = 0;
            this.minor.update();
            break;
          case "help":
            this.state = 1;
            break;
          case "build":
            if (this.menu === 0) this.menu = 1;
            break;
          case "menu":
            if (this.menu !== -1) {
              this.menu = -1;
              this.mouse.mode = 0;
            } else if (this.menu === -1) {
              this.menu = 0;
            }
            break;
          case "back":
            if (this.menu === 1) {
              this.menu = 0;
              this.mouse.mode = 0;
            }
        }
        this.tester.input(result);
      }
      return {
        change: false
      };
    };

    GameMode.prototype.mouse_input = function(result) {
      if (this.state === -1) {
        this.mouse.x = result.x;
        this.mouse.y = result.y;
        if (this.mouse.mode === 1) return this.map.dest.add_stockpile(this.mouse);
      }
    };

    GameMode.prototype.update_draw = function() {
      if (this.state === -1) {
        return {
          units: this.units.units,
          map: this.map,
          msg: this.msgs.get_last_update(),
          state: -1,
          menu: this.menu,
          mouse: this.mouse
        };
      }
      return GameMode.__super__.update_draw.call(this);
    };

    return GameMode;

  })(Mode);

  ScenarioKeyMode = (function(_super) {

    __extends(ScenarioKeyMode, _super);

    function ScenarioKeyMode(p5) {
      this.p5 = p5;
    }

    ScenarioKeyMode.prototype.key_pressed = function(state) {
      console.log(this.p5.key.code);
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

  })(KeyMode);

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
          _ref = this.parent.units.msgs.relations;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            r = _ref[_i];
            _results.push(this.options.add_text([r.summary]));
          }
          return _results;
          break;
        case 0:
          return this.options.add_text(this.parent.msgs.relations[this.unit].msgs);
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
      return false;
    };

    return CombatReportKeyMinorMode;

  })();

  gameMinorModeList = function() {
    return ["CombatReport", "Help"];
  };

  menuMinorModeList = function() {
    return [];
  };

  HelpKeyMinorMode = (function() {

    function HelpKeyMinorMode(p5) {
      this.p5 = p5;
    }

    HelpKeyMinorMode.prototype.key_pressed = function() {
      console.log(this.p5.key.code);
      switch (this.p5.key.code) {
        case 10:
          return "select";
        case 113:
          return "back";
      }
      return false;
    };

    return HelpKeyMinorMode;

  })();

  HelpMinorMode = (function() {

    function HelpMinorMode(parent) {
      this.parent = parent;
    }

    HelpMinorMode.prototype.act = function() {};

    HelpMinorMode.prototype.input = function(result) {
      switch (result) {
        case "back":
          return this.parent.state = -1;
      }
    };

    HelpMinorMode.prototype.update_draw = function() {
      return {
        state: 1
      };
    };

    return HelpMinorMode;

  })();

  CombatReportDrawMinorMode = (function() {

    function CombatReportDrawMinorMode(p5) {
      this.p5 = p5;
      this.texts = new TextOptionsDraw(this.p5, 30, 12, 12);
    }

    CombatReportDrawMinorMode.prototype.draw = function(object) {
      var k, msg, name, _i, _j, _len, _len2, _ref, _ref2;
      this.p5.background(0);
      this.p5.fill(255, 0, 0);
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
          this.p5.text(object.name + " killed about " + object.kills.length + " beings", 20, 12);
          this.p5.text("Kill list:", 30, 22);
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

  HelpDrawMinorMode = (function() {

    function HelpDrawMinorMode(p5) {
      this.p5 = p5;
    }

    HelpDrawMinorMode.prototype.draw = function(object) {
      var h, p;
      this.p5.background(0);
      frameRateDraw(this.p5);
      this.p5.fill(255);
      this.p5.textFont("monospace", 20);
      this.p5.text("Map Navigation", 10, 100);
      this.p5.textFont("monospace", 15);
      boxedText(this.p5, 30, 120, "w");
      boxedText(this.p5, 10, 140, "a");
      boxedText(this.p5, 30, 140, "s");
      boxedText(this.p5, 50, 140, "d");
      this.p5.text("w - up", 10, 160);
      this.p5.text("a - left", 10, 180);
      this.p5.text("s - down", 10, 200);
      this.p5.text("d - right", 10, 220);
      this.p5.textFont("monospace", 20);
      this.p5.text("Tiles", 10, 250);
      this.p5.line(0, 250, 500, 250);
      this.p5.line(0, 100, 500, 100);
      this.p5.line(0, 525, 500, 525);
      floorDraw(this.p5, 10, 260);
      this.p5.textFont("monospace", 15);
      this.p5.fill(255);
      this.p5.text("floor", 35, 280);
      wallDraw(this.p5, 10, 290);
      this.p5.fill(255);
      this.p5.text("wall", 35, 310);
      crystalDraw(this.p5, 10, 320, 0, null);
      this.p5.fill(255);
      this.p5.text("crystal", 35, 340);
      crystalTreeDraw(this.p5, 10, 350);
      this.p5.fill(255);
      this.p5.text("crystal tree: where you get your crystals", 35, 370);
      crystalStockpileDraw(this.p5, 10, 430);
      this.p5.fill(255);
      this.p5.text("crystal stockpile destination area. This is where all your crystals will be gathered", 35, 450);
      this.p5.textFont("monospace", 20);
      this.p5.text("Units", 10, 525);
      this.p5.textFont("monospace", 15);
      this.p5.text("All units are colorcoded by their gender. Blue is for male. Pink is for female.", 10, 550);
      h = new Human(10, 570, "blah", 0);
      this.p5.fill(255);
      this.p5.text(" stands for human.", 25, 570);
      unitDraw(this.p5, h, h.x, h.y);
      p = new Lightboar(10, 590, "pig", 1);
      unitDraw(this.p5, p, p.x, p.y);
      this.p5.fill(255);
      this.p5.text(" stands for lightboars.", 25, 590);
      backgroundMenuDraw(this.p5);
      return helpMenuDraw(this.p5);
    };

    return HelpDrawMinorMode;

  })();

  Relation = (function() {

    function Relation() {
      this.msgs = [];
    }

    Relation.prototype.last = function() {
      return this.msgs[this.msgs.length - 1];
    };

    Relation.prototype.add_msg = function(msg) {
      return this.msgs.push(msg);
    };

    return Relation;

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

  unitCombat = (function() {

    function unitCombat(unit) {
      this.unit = unit;
      this.target = null;
    }

    unitCombat.prototype.detect = function(units) {
      var list;
      if (this.target === null && this.unit.hostility === 0) {
        list = units.hostile_filter(1);
        if (list.length === 0) return;
        return this.target = list[random_number(list.length)];
      }
    };

    unitCombat.prototype.damage = function(unit) {
      var damage, object, part;
      part = random_number(this.unit.body.parts.length);
      damage = this.unit.body.parts[part].interact();
      object = {
        actors: [unit.name, this.unit.name],
        part: damage.part,
        type: damage.type,
        cause: damage.cause,
        special: null,
        action: "strike",
        protect: damage.protect
      };
      switch (damage.type) {
        case 1:
          this.unit.body.death = 1;
          break;
        case 2:
          switch (this.unit.body.update_ability(damage.damage)) {
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

    unitCombat.prototype.counteraction = function(target) {
      var act, i;
      this.target = target;
      act = random_number(6);
      for (i = 0; i <= 2; i++) {
        if (act === i) return this.target.combat.dodge(this.unit);
      }
      return false;
    };

    unitCombat.prototype.attack = function() {
      var action;
      if (this.target === null) return -1;
      if (this.is_next_to_target() && this.unit.body.hand !== 2) {
        if (this.target.stance === 1) this.target.combat.target = this.unit;
        action = this.counteraction(this.target);
        if (action === false) {
          return [this.target.combat.damage(this.unit)];
        } else if (action.ability === false) {
          return [action, this.target.combat.damage(this.unit)];
        }
        return [action];
      } else {
        this.determine_direction();
      }
      return -1;
    };

    unitCombat.prototype.dodge = function(target) {
      var ability, choice, list, result;
      list = approachesList(target);
      result = nearest_object(this.unit, list);
      if (this.unit.body.leg === 2) {
        ability = false;
      } else {
        ability = true;
        while (true) {
          choice = list[random_number(list.length)];
          if (choice.x !== result.x || choice.y !== result.y) {
            this.unit.x = choice.x;
            this.unit.y = choice.y;
            break;
          }
        }
      }
      return {
        actors: [this.unit.name, target.name],
        action: "dodge",
        ability: ability
      };
    };

    unitCombat.prototype.is_next_to_target = function() {
      if (distance_between_two_points(this.unit, this.target) === 1) return true;
      return false;
    };

    unitCombat.prototype.determine_direction = function() {
      var goal;
      goal = nearest_object(this.unit, approachesList(this.target));
      return this.unit.set_move(goal.x, goal.y);
    };

    unitCombat.prototype.nullify_target = function() {
      var data;
      if (this.target === null) return false;
      data = {
        actors: [this.unit.name, this.target.name],
        action: null
      };
      if (this.target.body.check_death() === true) {
        this.unit.kills.push(this.target.name);
        this.target = null;
        data.action = "killed";
        return data;
      } else if (this.target.leave === true) {
        this.target = null;
        data.action = "escaped";
        return data;
      }
      return false;
    };

    return unitCombat;

  })();

  Unit = (function() {

    function Unit(x, y, type, name, gender) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.name = name;
      this.gender = gender;
      this.body = new Body(this.type);
      this.goal_x = this.x;
      this.goal_y = this.y;
      this.kills = [];
      this.inventory = [];
      this.job = null;
      this.queue_type = null;
      this.queue = [];
      this.order = null;
      this.perform = null;
      this.leave = false;
      this.advance = false;
      this.stance = 0;
      this.move_list = [];
      this.combat = new unitCombat(this);
    }

    Unit.prototype.set_job = function(job) {
      this.job = job;
      this.queue_type = job.get_type();
      this.queue = job.jobs[this.queue_type].orders;
      return this.job.jobs[this.queue_type].assigned.push(this);
    };

    Unit.prototype.set_move = function(x, y) {
      this.goal_x = x;
      return this.goal_y = y;
    };

    Unit.prototype.act_on_queue = function() {
      if (this.perform === this.order || this.queue.length === 0) return true;
      return false;
    };

    Unit.prototype.drop_item = function(name) {
      var i, item, _i, _len, _ref;
      i = 0;
      _ref = this.inventory;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item === name) break;
        i += 1;
      }
      return this.inventory.slice(i, 0);
    };

    Unit.prototype.acquire_item = function(name) {
      return this.inventory.push(name);
    };

    Unit.prototype.at_goal_check = function() {
      if ((this.y === this.goal_y && this.x === this.goal_x) || this.goal_x === -1) {
        return true;
      }
      return false;
    };

    Unit.prototype.move = function(finder) {
      var movement, result;
      if (this.body.leg === 2) return;
      if (this.at_goal_check()) {
        this.next_order();
        return;
      }
      if (this.move_list.length === 0) {
        result = finder.calculate_path({
          x: this.x,
          y: this.y
        }, {
          x: this.goal_x,
          y: this.goal_y
        });
        if (result === false) {
          return this.goal_x = -1;
        } else {
          return this.move_list = result;
        }
      } else {
        movement = this.move_list[this.move_list.length - 1];
        this.x = movement.x;
        this.y = movement.y;
        return this.move_list.pop();
      }
    };

    Unit.prototype.next_order = function() {
      if (this.advance === false || this.combat.target !== null) return;
      if (this.order !== null) this.order += 1;
      if (this.order === this.queue.length) return this.order = 0;
    };

    return Unit;

  })();

  Wood = (function() {

    function Wood() {}

    Wood.prototype.collide = function() {
      return true;
    };

    Wood.prototype.cut = function() {
      this.cuts_needed -= 1;
      if (this.cuts_needed === 0) return true;
      return false;
    };

    return Wood;

  })();

  Stockpile = (function() {

    function Stockpile(x, y) {
      this.x = x;
      this.y = y;
      this.persons = [];
      this.nearest = null;
      this.drop = null;
      this.finish = false;
      this.width = 4;
      this.height = 4;
      this.jobs = [];
      this.jobs.push(new Job(["move_to_source", "gather_item", "move_to_drop", "drop_item"]));
    }

    Stockpile.prototype.check_assign = function() {
      var j, n, _i, _len, _ref;
      n = 0;
      _ref = this.jobs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        j = _ref[_i];
        if (j.assigned.length > 0) n += 1;
      }
      if (n === this.jobs.length) return true;
      return false;
    };

    Stockpile.prototype.rect = function() {
      return {
        x: this.x - 2,
        y: this.y - 2,
        width: this.width,
        height: this.height
      };
    };

    Stockpile.prototype.create_drop = function(map) {
      var locations;
      locations = map.free_locations(this.x, this.y, 2);
      if (locations.length === 0) {
        this.finish = true;
        return false;
      }
      return this.drop = nearest_object(this, locations);
    };

    Stockpile.prototype.find_nearest = function(map, name) {
      var list;
      list = map.dest.exclude(map.decide_list(name), this);
      this.nearest = nearest_object(this, list);
      return this.nearest;
    };

    Stockpile.prototype.delete_nearest_if_empty = function(map) {
      if (this.nearest.items === 0) {
        map.sketch["delete"](this.nearest.x, this.nearest.y, this.nearest.name);
        return map.sketch.delete_type(this.nearest.x, this.nearest.y, this.nearest.name);
      }
    };

    Stockpile.prototype.get_drop_location = function(map) {
      if (this.drop === null) {
        if (this.create_drop(map) === false) return false;
      } else if (map.select_by_name(this.store, this.drop.x, this.drop.y).fullness() === true) {
        if (this.create_drop(map) === false) return false;
      }
      return this.drop;
    };

    return Stockpile;

  })();

  Item = (function() {

    function Item(x, y) {
      this.x = x;
      this.y = y;
      this.items = 1;
      this.background = null;
      this.stack = 0;
    }

    Item.prototype.collide = function() {
      return true;
    };

    Item.prototype.fullness = function() {
      if (this.items < this.limit) return false;
      return true;
    };

    Item.prototype.increase = function() {
      if (this.fullness() === false) {
        this.items += 1;
        return true;
      }
      return false;
    };

    Item.prototype.acquire = function() {
      this.items -= 1;
      return this.name;
    };

    return Item;

  })();

  Log = (function(_super) {

    __extends(Log, _super);

    function Log(x, y) {
      this.x = x;
      this.y = y;
      this.name = "log";
      this.cuts_needed = 2;
    }

    return Log;

  })(Wood);

  Pathfinder = (function() {

    function Pathfinder(map) {
      this.map = map;
    }

    Pathfinder.prototype.calculate_adjacent = function(location, goal) {
      var now, results, x, y, _ref, _ref2, _ref3, _ref4;
      results = [];
      for (x = _ref = location.x - 1, _ref2 = location.x + 1; _ref <= _ref2 ? x <= _ref2 : x >= _ref2; _ref <= _ref2 ? x++ : x--) {
        for (y = _ref3 = location.y - 1, _ref4 = location.y + 1; _ref3 <= _ref4 ? y <= _ref4 : y >= _ref4; _ref3 <= _ref4 ? y++ : y--) {
          if (!(x === location.x && y === location.y)) {
            if (this.map.collision.propose_drop(x, y)) {
              now = {
                x: x,
                y: y,
                parent: null,
                g: 0,
                f: 0,
                h: 0
              };
              results.push(now);
            }
          }
        }
      }
      return results;
    };

    Pathfinder.prototype.sort_by_least_cost = function(a, b) {
      return a.f - b.f;
    };

    Pathfinder.prototype.part_of = function(item, list) {
      var i, l, _i, _len;
      i = 0;
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        l = list[_i];
        if (item.x === l.x && item.y === l.y) return i;
        i += 1;
      }
      return false;
    };

    Pathfinder.prototype.calculate_path = function(start, goal) {
      var best_g_score, close, current, end, g_score, neighbor, now, open, results, _i, _len, _ref;
      if (!this.map.collision.propose_drop(goal.x, goal.y)) {
        console.log("Location is unwalkable!");
        return false;
      }
      start.g = 0;
      start.h = distance_between_two_points(start, goal);
      start.f = start.g + start.h;
      close = [];
      open = [start];
      start = new Date().getTime();
      while (open.length > 0) {
        open.sort(this.sort_by_least_cost);
        current = open[0];
        if (current.x === goal.x && current.y === goal.y) {
          now = current;
          results = [];
          while (now.parent) {
            results.push(now);
            now = now.parent;
          }
          end = new Date().getTime();
          console.log("path calculation time in MS: " + (end - start));
          return results;
        }
        open.shift();
        close.push(current);
        _ref = this.calculate_adjacent(current, goal);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          neighbor = _ref[_i];
          if (this.part_of(neighbor, close) !== false) continue;
          g_score = current.g + distance_between_two_points(current, neighbor);
          best_g_score = false;
          if (this.part_of(neighbor, open) === false) {
            neighbor.h = distance_between_two_points(neighbor, goal);
            open.push(neighbor);
            best_g_score = true;
          } else if (g_score < neighbor.g) {
            best_g_score = true;
          }
          if (best_g_score === true) {
            neighbor.parent = current;
            neighbor.g = g_score;
            neighbor.f = neighbor.g + neighbor.h;
          }
        }
      }
      end = new Date().getTime();
      console.log("can't find path. Calculation in MS: " + (end - start));
      return false;
    };

    return Pathfinder;

  })();

  Camera = (function() {

    function Camera() {
      this.x = 0;
      this.y = 0;
    }

    Camera.prototype.move = function(x, y) {
      this.x += x;
      if (this.x < 0 || this.x > 60) this.x -= x;
      this.y += y;
      if (this.y < 0 || this.y > 70) return this.y -= y;
    };

    return Camera;

  })();

  timberStock = (function(_super) {

    __extends(timberStock, _super);

    function timberStock(x, y) {
      timberStock.__super__.constructor.call(this, x, y);
      this.name = "timber_stockpile";
      this.store = "timber";
      this.priority = 4;
      this.diameter = 5;
      this.size = 10;
      this.queue = false;
      this.times = 24;
      this.target = null;
      this.jobs.push(new Job(["find", "cut_down"]));
    }

    timberStock.prototype.get_type = function() {
      var i, j, _i, _len, _ref;
      i = 0;
      _ref = this.jobs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        j = _ref[_i];
        if (j.assigned.length === 0) return i;
        i += 1;
      }
    };

    timberStock.prototype.find_nearest_cut = function(map) {
      this.targets = map.trees.concat(map.logs);
      if (this.targets.length !== 0) {
        this.target = nearest_object(this, this.targets);
        return this.target;
      }
      return false;
    };

    timberStock.prototype.collide = function() {
      return true;
    };

    return timberStock;

  })(Stockpile);

  GenerateMap = (function() {

    function GenerateMap(map) {
      this.map = map;
      this.sketch = this.map.sketch;
    }

    GenerateMap.prototype.generate_trees = function() {
      var i, x, y, _results;
      _results = [];
      for (i = 0; i <= 9; i++) {
        x = random_number(this.map.width);
        y = random_number(this.map.height);
        _results.push(this.sketch.create("tree", x, y));
      }
      return _results;
    };

    GenerateMap.prototype.generate_crystal_trees = function() {
      var success, x, y, _results;
      success = 0;
      _results = [];
      while (true) {
        x = random_number(this.map.width);
        y = random_number(this.map.height);
        if (this.sketch.create("crystalTree", x, y) === true) success += 1;
        if (success === 10) {
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    GenerateMap.prototype.generate_paths = function() {
      var free, i, locations, m, _i, _len, _ref, _ref2, _results;
      locations = [];
      _ref = this.map.crystalTrees;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        free = this.map.free_locations(m.x, m.y, 1);
        locations.push(free[random_number(free.length)]);
      }
      _results = [];
      for (i = 0, _ref2 = locations.length - 2; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
        _results.push(this.sketch.draw(locations[i], locations[i + 1], "floor", true));
      }
      return _results;
    };

    GenerateMap.prototype.create_building = function(x, y, size) {
      var begin, choices, direction, end, rect, wall_a, wall_b, _i, _j, _k, _l, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _results, _results2, _results3, _results4;
      rect = new Rect(x, y, size, size);
      if (this.map.collision.collide_check(rect) === true || this.map.rect_inbound(rect) === false || size < 2) {
        return;
      }
      this.map.collision.forbid(rect);
      begin = {
        x: x + 1,
        y: y + 1
      };
      end = {
        x: begin.x + (size - 2),
        y: begin.y + (size - 2)
      };
      this.sketch.rect_draw(begin, end, "floor");
      wall_a = {
        x: begin.x - 1,
        y: begin.y - 1
      };
      wall_b = {
        x: begin.x - 1,
        y: end.y + 1
      };
      this.sketch.draw(wall_a, wall_b, "wall");
      wall_a = {
        x: end.x + 1,
        y: begin.y - 1
      };
      wall_b = {
        x: end.x + 1,
        y: end.y + 1
      };
      this.sketch.draw(wall_a, wall_b, "wall");
      wall_a = {
        x: begin.x,
        y: begin.y - 1
      };
      wall_b = {
        x: end.x,
        y: begin.y - 1
      };
      this.sketch.draw(wall_a, wall_b, "wall");
      wall_a = {
        x: begin.x,
        y: end.y + 1
      };
      wall_b = {
        x: end.x,
        y: end.y + 1
      };
      this.sketch.draw(wall_a, wall_b, "wall");
      direction = random_number(4);
      switch (direction) {
        case 0:
          x = begin.x - 1;
          choices = (function() {
            _results = [];
            for (var _i = _ref = begin.y - 1, _ref2 = end.y + 1; _ref <= _ref2 ? _i <= _ref2 : _i >= _ref2; _ref <= _ref2 ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this);
          choices.pop();
          choices.shift();
          y = choices[random_number(choices.length)];
          break;
        case 1:
          x = end.x + 1;
          choices = (function() {
            _results2 = [];
            for (var _j = _ref3 = begin.y - 1, _ref4 = end.y + 1; _ref3 <= _ref4 ? _j <= _ref4 : _j >= _ref4; _ref3 <= _ref4 ? _j++ : _j--){ _results2.push(_j); }
            return _results2;
          }).apply(this);
          choices.pop();
          choices.shift();
          y = choices[random_number(choices.length)];
          break;
        case 2:
          y = begin.y - 1;
          choices = (function() {
            _results3 = [];
            for (var _k = _ref5 = begin.x - 1, _ref6 = end.x + 1; _ref5 <= _ref6 ? _k <= _ref6 : _k >= _ref6; _ref5 <= _ref6 ? _k++ : _k--){ _results3.push(_k); }
            return _results3;
          }).apply(this);
          choices.pop();
          choices.shift();
          x = choices[random_number(choices.length)];
          break;
        case 3:
          y = end.y + 1;
          choices = (function() {
            _results4 = [];
            for (var _l = _ref7 = begin.x - 1, _ref8 = end.x + 1; _ref7 <= _ref8 ? _l <= _ref8 : _l >= _ref8; _ref7 <= _ref8 ? _l++ : _l--){ _results4.push(_l); }
            return _results4;
          }).apply(this);
          choices.pop();
          choices.shift();
          x = choices[random_number(choices.length)];
      }
      return this.sketch["delete"](x, y, "wall");
    };

    GenerateMap.prototype.generate_buildings = function() {
      var i, size, x, y, _results;
      _results = [];
      for (i = 0; i <= 15; i++) {
        x = random_number(100);
        y = random_number(100);
        size = random_number(5);
        _results.push(this.create_building(x, y, size));
      }
      return _results;
    };

    GenerateMap.prototype.generate = function() {
      this.generate_buildings();
      this.generate_trees();
      this.generate_crystal_trees();
      return this.generate_paths();
    };

    return GenerateMap;

  })();

  Torso = (function(_super) {

    __extends(Torso, _super);

    function Torso() {
      Torso.__super__.constructor.call(this, "Torso");
      this.subparts.push(new Subpart("heart", 1));
      this.subparts.push(new Subpart("left_lung", 2));
      this.subparts.push(new Subpart("right_lung", 2));
      this.subparts.push(new Subpart("rib_left_one", 3));
      this.subparts.push(new Subpart("rib_left_two", 3));
      this.subparts.push(new Subpart("rib_left_three", 3));
      this.subparts.push(new Subpart("rib_right_one", 3));
      this.subparts.push(new Subpart("rib_right_two", 3));
      this.subparts.push(new Subpart("rib_right_three", 3));
      this.subparts[0].protector = this.subparts[3];
      this.subparts[1].protector = this.subparts[4];
      this.subparts[2].protector = this.subparts[7];
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
      switch (part.type) {
        case 2:
          switch (part.protector.damage) {
            case 0:
              part.protector.damage = 1;
              return {
                type: 3,
                part: part.name,
                protect: part.protector.name
              };
            case 1:
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
          }
          break;
        case 1:
          switch (part.protector.damage) {
            case 0:
              part.protector.damage = 1;
              return {
                type: 3,
                part: part.name,
                protect: part.protector.name
              };
            case 1:
              part.damage = 1;
              return {
                type: 1,
                part: part.name,
                cause: "heart failure"
              };
          }
          break;
        case 3:
          part.damage = 1;
          return {
            type: 0,
            part: part.name
          };
      }
    };

    return Torso;

  })(Part);

  MapSketch = (function() {

    function MapSketch(map) {
      this.map = map;
      this.finder = new Pathfinder(this.map);
      this.last = null;
    }

    MapSketch.prototype.create = function(name, x, y, list) {
      var object, result;
      if (list == null) list = true;
      object = eval("new " + name.capitalize() + "(x,y)");
      if (this.push_to_map(object.x, object.y, object) === true) {
        if (list === true) {
          result = eval("this.map." + name + "s");
          result.push(object);
        }
        return true;
      }
      return false;
    };

    MapSketch.prototype.push_to_map = function(x, y, item) {
      if (this.map.collision.create_check(x, y, item) === true) {
        this.map.map[y][x].push(item);
        return true;
      }
      return false;
    };

    MapSketch.prototype.rect_draw = function(begin, end, type) {
      var x, y, _ref, _ref2, _results;
      _results = [];
      for (x = _ref = begin.x, _ref2 = end.x; _ref <= _ref2 ? x <= _ref2 : x >= _ref2; _ref <= _ref2 ? x++ : x--) {
        _results.push((function() {
          var _ref3, _ref4, _results2;
          _results2 = [];
          for (y = _ref3 = begin.y, _ref4 = end.y; _ref3 <= _ref4 ? y <= _ref4 : y >= _ref4; _ref3 <= _ref4 ? y++ : y--) {
            _results2.push(this.draw_location({
              x: x,
              y: y
            }, type));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    MapSketch.prototype.pathing = function(point_a, point_b) {
      var results;
      results = this.finder.calculate_path(point_a, point_b);
      if (results !== -1) results.push(point_a);
      return results;
    };

    MapSketch.prototype.draw_location = function(location, type, thicken) {
      if (thicken == null) thicken = false;
      switch (type) {
        case "wall":
          return this.create("wall", location.x, location.y, false);
        case "crystal":
          return this.create("crystal", location.x, location.y);
        case "floor":
          this.create("floor", location.x, location.y, false);
          if (thicken === true) {
            this.create("floor", location.x - 1, location.y, false);
            return this.create("floor", location.x, location.y - 1, false);
          }
      }
    };

    MapSketch.prototype.draw = function(point_a, point_b, type, thicken) {
      var location, results, _i, _len;
      results = this.pathing(point_a, point_b);
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        location = results[_i];
        this.draw_location(location, type, thicken);
      }
      return this.last = null;
    };

    MapSketch.prototype["delete"] = function(x, y, type) {
      var m, n, _i, _len, _ref;
      n = 0;
      _ref = this.map.map[y][x];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.name === type) break;
        n += 1;
      }
      this.map.map[y][x].splice(n, 1);
      return this.map.redraw.push({
        x: x,
        y: y
      });
    };

    MapSketch.prototype.delete_type = function(x, y, type) {
      var m, n, _i, _len, _ref;
      n = 0;
      _ref = this.map.decide_list(type);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.x === x && m.y === y) break;
        n += 1;
      }
      return this.map.decide_list(type).splice(n, 1);
    };

    MapSketch.prototype.cut_down = function(x, y, d) {
      var i, object, tree, _results;
      tree = this.map.select_by_name("tree", x, y);
      if (tree === false) {
        object = this.map.select_by_name("log", x, y);
      } else {
        object = tree;
      }
      this["delete"](x, y, object.name);
      this.delete_type(x, y, object.name);
      if (object.name === "log") {
        this.create("timber", x, y);
        this.map.new_object(x, y);
      }
      if (object.name === "tree") {
        x += d.x;
        y += d.y;
        _results = [];
        for (i = 0; i <= 4; i++) {
          if (this.create("log", x, y) === true) this.map.new_object(x, y);
          x += d.x;
          _results.push(y += d.y);
        }
        return _results;
      }
    };

    return MapSketch;

  })();

  MapDestinate = (function() {

    function MapDestinate(map) {
      this.map = map;
    }

    MapDestinate.prototype.decide_stock = function(mouse, x, y) {
      switch (mouse.build) {
        case "tree":
          return new timberStock(x, y);
        case "crystal":
          return new CrystalStock(x, y);
      }
    };

    MapDestinate.prototype.add_stockpile = function(mouse) {
      var newpoint, x, y;
      x = Math.floor(mouse.x / 20) + this.map.camera.x;
      y = Math.floor(mouse.y / 20) + this.map.camera.y;
      if (x < 2 || x > 97) return;
      if (y < 2 || y > 97) return;
      newpoint = this.decide_stock(mouse, x, y);
      if (!(this.map.stockpoints_collision_detect(newpoint) === true || this.map.collision.propose_drop(x, y) === false)) {
        this.map.map[y][x].push(newpoint);
        return this.map.stockpoints.push(newpoint);
      }
    };

    MapDestinate.prototype.exclude = function(list, stockpile) {
      var l, new_list, _i, _len;
      new_list = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        l = list[_i];
        if (pointToRectCollision(l, stockpile.rect()) === false) new_list.push(l);
      }
      return new_list;
    };

    return MapDestinate;

  })();

  ResourceRelation = (function(_super) {

    __extends(ResourceRelation, _super);

    function ResourceRelation(person, resource) {
      this.person = person;
      this.resource = resource;
      this.summary = this.person + " 's acts on resource " + this.resource;
      ResourceRelation.__super__.constructor.call(this);
    }

    return ResourceRelation;

  })(Relation);

  Body = (function() {

    function Body(type) {
      switch (type) {
        case 1:
          this.parts = human_body();
          break;
        case 2:
          this.parts = boar_body();
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

  Head = (function(_super) {

    __extends(Head, _super);

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

  })(Part);

  Floor = (function() {

    function Floor(x, y) {
      this.x = x;
      this.y = y;
      this.name = "floor";
    }

    Floor.prototype.collide = function() {
      return false;
    };

    return Floor;

  })();

  CombatRelation = (function(_super) {

    __extends(CombatRelation, _super);

    function CombatRelation(actors) {
      this.actors = actors;
      this.summary = this.actors[0] + " and " + this.actors[1] + " are engaged in mortal combat!";
      CombatRelation.__super__.constructor.call(this);
    }

    return CombatRelation;

  })(Relation);

  scenarioList = function() {
    return ["combat", "hand_disability_combat", "leg_disability", "pig_invasion", "hand_disability_gathering", "full_test_boars", "pathfinding", "unpathable_1", "unpathable_2", "terrain_test", "cuttingDown"];
  };

  Human = (function(_super) {

    __extends(Human, _super);

    function Human(x, y, name, gender) {
      Human.__super__.constructor.call(this, x, y, 1, name, gender);
      this.hostility = 0;
      this.advance = true;
      this.agility = 5;
    }

    Human.prototype.gather_action = function(map) {
      var choice, choices, object;
      switch (this.queue[this.order]) {
        case "move_to_drop":
          object = this.job.get_drop_location(map);
          if (object === false) {
            this.job = null;
            this.queue = [];
            this.perform = null;
            return false;
          }
          choices = map.free_locations(object.x, object.y, 1);
          choice = choices[random_number(choices.length)];
          this.set_move(choice.x, choice.y);
          break;
        case "move_to_source":
          this.advance = true;
          object = this.job.find_nearest(map, "timber");
          if (object === null) {
            if (map.trees.length !== 0 || map.logs.length !== 0) {
              this.advance = false;
              return false;
            } else {
              this.job = null;
              this.queue = [];
              this.perform = null;
            }
            return false;
          }
          choices = map.free_locations(object.x, object.y, 1);
          choice = choices[random_number(choices.length)];
          this.set_move(choice.x, choice.y);
          break;
        case "gather_item":
          this.acquire_item(this.job.nearest.acquire());
          this.job.delete_nearest_if_empty(map);
          break;
        case "drop_item":
          this.drop_item(this.job.store);
          map.drop_item(this.job.drop.x, this.job.drop.y, this.job.store);
      }
      return true;
    };

    Human.prototype.cut_action = function(map) {
      var choice, choices, direction, object;
      switch (this.queue[this.order]) {
        case "find":
          object = this.job.find_nearest_cut(map);
          if (object === false) {
            this.job = null;
            this.queue = [];
            this.perform = null;
            return false;
          }
          choices = map.free_locations(object.x, object.y, 1);
          choice = choices[random_number(choices.length)];
          this.set_move(choice.x, choice.y);
          break;
        case "cut_down":
          if (this.job.target.cut() === true) {
            this.advance = true;
            direction = {
              x: -1,
              y: 0
            };
            map.sketch.cut_down(this.job.target.x, this.job.target.y, direction);
          } else {
            this.advance = false;
            return false;
          }
      }
      return true;
    };

    Human.prototype.set_action = function(map) {
      var status;
      if (this.act_on_queue()) return;
      if (this.body.hand === 2) return;
      switch (this.queue_type) {
        case 0:
          status = this.gather_action(map);
          break;
        case 1:
          status = this.cut_action(map);
      }
      if (status === true) return this.perform = this.order;
    };

    return Human;

  })(Unit);

  CrystalStock = (function(_super) {

    __extends(CrystalStock, _super);

    function CrystalStock(x, y) {
      CrystalStock.__super__.constructor.call(this, x, y);
      this.name = "crystal_stockpile";
      this.store = "crystal";
      this.jobs[0].find = this.store;
      this.priority = 4;
      this.diameter = 5;
      this.size = 10;
      this.queue = false;
    }

    CrystalStock.prototype.get_type = function() {
      return 0;
    };

    CrystalStock.prototype.collide = function() {
      return true;
    };

    return CrystalStock;

  })(Stockpile);

  boar_body = function() {
    var parts;
    parts = [];
    parts.push(new Head());
    parts.push(new Torso());
    parts.push(new Leg("right_leg"));
    parts.push(new Leg("left_leg"));
    parts.push(new Leg("hind_left_leg"));
    parts.push(new Leg("hind_right_leg"));
    return parts;
  };

  Rect = (function() {

    function Rect(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    return Rect;

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

  Subpart = (function() {

    function Subpart(name, type) {
      this.name = name;
      this.type = type;
      this.damage = 0;
      this.protector = null;
    }

    return Subpart;

  })();

  Arm = (function(_super) {

    __extends(Arm, _super);

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

  })(Part);

  Map = (function() {

    function Map(width, height) {
      this.width = width;
      this.height = height;
      this.setup();
    }

    Map.prototype.setup = function() {
      this.map = [];
      this.size_map();
      this.stockpoints = [];
      this.crystals = [];
      this.timbers = [];
      this.logs = [];
      this.crystalTrees = [];
      this.trees = [];
      this.collision = new Collision(this);
      this.sketch = new MapSketch(this);
      this.generate = new GenerateMap(this);
      this.dest = new MapDestinate(this);
      this.camera = new Camera();
      return this.redraw = [];
    };

    Map.prototype.size_map = function() {
      var x, y, _ref, _results;
      _results = [];
      for (y = 0, _ref = this.height - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        this.map.push(new Array(this.width));
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (x = 0, _ref2 = this.width - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
            _results2.push(this.map[y][x] = []);
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    Map.prototype.items_total = function() {
      var c, items, _i, _len, _ref;
      items = 0;
      _ref = this.crystals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        items += this.map[c.y][c.x][c.stack].items;
      }
      return items;
    };

    Map.prototype.drop_item = function(x, y, item) {
      var m, _i, _len, _ref;
      _ref = this.map[y][x];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.name === item) {
          this.redraw.push({
            x: x,
            y: y
          });
          if (m.increase() === false) return false;
          return true;
        }
      }
      this.redraw.push({
        x: x,
        y: y
      });
      this.sketch.create(item, x, y);
      return true;
    };

    Map.prototype.new_object = function(x, y) {
      return this.redraw.push({
        x: x,
        y: y
      });
    };

    Map.prototype.rect_inbound = function(rect) {
      if (!this.collision.inbound(rect.x, rect.y)) return false;
      if (!this.collision.inbound(rect.x + rect.width, rect.y)) return false;
      if (!this.collision.inbound(rect.x, rect.y + rect.y + rect.height)) {
        return false;
      }
      return true;
    };

    Map.prototype.stockpoints_collision_detect = function(newpoint) {
      var point, _i, _len, _ref;
      if (this.stockpoints.length === 0) return false;
      _ref = this.stockpoints;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        if (circle_to_circle_collision(newpoint, point) === true) return true;
      }
      return false;
    };

    Map.prototype.select_by_name = function(name, x, y) {
      var m, _i, _len, _ref;
      _ref = this.map[y][x];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.name === name) return m;
      }
      return false;
    };

    Map.prototype.free_locations = function(x, y, size) {
      var begin_x, end_x, end_y, locations;
      end_x = x + size;
      begin_x = x - size;
      end_y = y + size;
      x = begin_x;
      y -= size;
      locations = [];
      while (true) {
        if (x > end_x) {
          x = begin_x;
          y += 1;
          if (y > end_y) break;
        }
        if (this.collision.propose_drop(x, y) === true) {
          locations.push({
            x: x,
            y: y
          });
        }
        x += 1;
      }
      return locations;
    };

    Map.prototype.acquire = function(x, y) {
      return this.select_by_name("crystal", x, y).acquire();
    };

    Map.prototype.select_last = function(x, y) {
      var l;
      if (this.map[y][x].length !== 0) {
        l = this.map[y][x].length - 1;
        return this.map[y][x][l];
      }
      return false;
    };

    Map.prototype.reset = function() {
      return this.setup();
    };

    Map.prototype.decide_list = function(which) {
      switch (which) {
        case "tree":
          return this.trees;
        case "crystal":
          return this.crystalTrees;
        case "log":
          return this.logs;
        case "timber":
          return this.timbers;
      }
    };

    return Map;

  })();

  Tree = (function(_super) {

    __extends(Tree, _super);

    function Tree(x, y) {
      this.x = x;
      this.y = y;
      this.name = "tree";
      this.cuts_needed = 10;
    }

    return Tree;

  })(Wood);

  DebugTile = (function() {

    function DebugTile(x, y) {
      this.x = x;
      this.y = y;
      this.name = "debug";
    }

    DebugTile.prototype.collide = function() {
      return false;
    };

    return DebugTile;

  })();

  Timber = (function(_super) {

    __extends(Timber, _super);

    function Timber(x, y) {
      this.x = x;
      this.y = y;
      this.name = "timber";
      this.limit = 1;
      Timber.__super__.constructor.call(this, this.x, this.y);
    }

    return Timber;

  })(Item);

  Collision = (function() {

    function Collision(map) {
      this.map = map;
      this.collide = [];
    }

    Collision.prototype.forbid = function(rect) {
      return this.collide.push(rect);
    };

    Collision.prototype.inbound = function(x, y) {
      if (y < 0 || y > this.map.width - 1 || x < 0 || x > this.map.height - 1) {
        return false;
      }
      return true;
    };

    Collision.prototype.check_compatibility = function(item, x, y) {
      var m, _i, _len, _ref;
      _ref = this.map.map[y][x];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.name === "wall") return false;
      }
      if (item.name === "crystal") {
        return true;
      } else if (item.name === "wood") {
        return true;
      }
      return false;
    };

    Collision.prototype.collide_check = function(individual) {
      if (rect_to_many_rect_collision(individual, this.collide) === true) {
        return true;
      }
      return false;
    };

    Collision.prototype.check_occupancy = function(x, y) {
      var m, _i, _len, _ref;
      _ref = this.map.map[y][x];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m.collide() === true) return true;
      }
      return false;
    };

    Collision.prototype.check_length = function(x, y) {
      if (this.map.map[y][x].length === 0) return true;
      return false;
    };

    Collision.prototype.create_check = function(x, y, item) {
      return this.inbound(x, y) && (this.check_compatibility(item, x, y) || this.check_length(x, y));
    };

    Collision.prototype.propose_drop = function(x, y) {
      if (this.inbound(x, y)) {
        if (!this.check_occupancy(x, y) || this.check_length(x, y)) return true;
      }
      return false;
    };

    return Collision;

  })();

  Crystal = (function(_super) {

    __extends(Crystal, _super);

    function Crystal(x, y) {
      this.x = x;
      this.y = y;
      this.name = "crystal";
      this.limit = 50;
      Crystal.__super__.constructor.call(this, this.x, this.y);
    }

    return Crystal;

  })(Item);

  CrystalTree = (function() {

    function CrystalTree(x, y) {
      this.x = x;
      this.y = y;
      this.pile = 50;
      this.name = "crystal_tree";
    }

    CrystalTree.prototype.collide = function() {
      return true;
    };

    CrystalTree.prototype.acquire = function() {
      this.pile -= 1;
      return "crystal";
    };

    return CrystalTree;

  })();

  Job = (function() {

    function Job(orders) {
      this.orders = orders;
      this.assigned = [];
      this.find = null;
    }

    return Job;

  })();

  Wall = (function() {

    function Wall(x, y) {
      this.x = x;
      this.y = y;
      this.name = "wall";
    }

    Wall.prototype.collide = function() {
      return true;
    };

    return Wall;

  })();

  Lightboar = (function(_super) {

    __extends(Lightboar, _super);

    function Lightboar(x, y, name, gender) {
      Lightboar.__super__.constructor.call(this, x, y, 2, name, gender);
      this.hostility = 1;
      this.queue = ["decide", "act", "move_to_escape", "escape"];
      this.order = 0;
      this.agility = 6;
      this.read = 0;
    }

    Lightboar.prototype.set_action = function(map, controller) {
      var choice, choices, crystal, object;
      if (this.act_on_queue()) return;
      switch (this.queue[this.order]) {
        case "decide":
          crystal = nearest_object(this, map.crystals);
          if (crystal === null) {
            this.advance = false;
            return;
          }
          this.advance = true;
          this.target_item = crystal;
          choices = map.free_locations(crystal.x, crystal.y, 1);
          choice = choices[random_number(choices.length)];
          this.set_move(choice.x, choice.y);
          break;
        case "act":
          this.acquire_item(map.acquire(this.target_item.x, this.target_item.y));
          break;
        case "move_to_escape":
          object = nearest_edge(this);
          this.set_move(object.x, object.y);
          break;
        case "escape":
          controller.tells("escape", 1);
          this.leave = true;
      }
      return this.perform = this.order;
    };

    Lightboar.prototype.receive_msg = function(msg) {
      switch (msg) {
        case "escape":
          if (this.order !== 3) this.order = 2;
          return this.advance = true;
      }
    };

    return Lightboar;

  })(Unit);

  Mouse = (function() {

    function Mouse() {
      this.mode = 0;
      this.build = null;
      this.x = 0;
      this.y = 0;
    }

    Mouse.prototype.map_coord = function() {
      return {
        x: Math.floor(this.x / 20),
        y: Math.floor(this.y / 20)
      };
    };

    return Mouse;

  })();

  Leg = (function(_super) {

    __extends(Leg, _super);

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

  })(Part);

  combat = function(units, map) {
    units.create(new Human(10, 10, "Miya", 1));
    units.create(new Human(10, 20, "John", 0));
    units.units[0].combat.target = units.units[1];
    return units.units[1].stance = 1;
  };

  handDisabilityGathering = function(units, map) {
    var location;
    units.create(new Human(10, 10, "gatherer", 0));
    units.units[0].body.hand = 2;
    location = {
      x: 300,
      y: 300
    };
    return map.dest.add_stockpile(location);
  };

  pathfinding = function(units, map) {
    var begin, bottom_begin, bottom_end, end, top_begin, top_end, vertical_begin, vertical_end;
    units.create(new Human(10, 10, "pathfinder_one", 0));
    units.create(new Human(10, 20, "pathfinder_two", 0));
    begin = {
      x: 15,
      y: 11
    };
    end = {
      x: 15,
      y: 9
    };
    map.sketch.draw(begin, end, "wall");
    units.units[0].set_move(20, 10);
    units.units[0].agility = 25;
    top_begin = {
      x: 13,
      y: 14
    };
    top_end = {
      x: 20,
      y: 14
    };
    map.sketch.draw(top_begin, top_end, "wall");
    bottom_begin = {
      x: 13,
      y: 25
    };
    bottom_end = {
      x: 20,
      y: 25
    };
    map.sketch.draw(bottom_begin, bottom_end, "wall");
    vertical_begin = {
      x: 20,
      y: 15
    };
    vertical_end = {
      x: 20,
      y: 24
    };
    map.sketch.draw(vertical_begin, vertical_end, "wall");
    units.units[1].set_move(25, 20);
    return units.units[1].agility = 25;
  };

  unpathable2 = function(units, map) {
    var begin, end;
    map.width = 40;
    map.height = 30;
    map.size_map();
    units.create(new Human(10, 10, "pathfinder_one", 0));
    begin = {
      x: 19,
      y: 9
    };
    end = {
      x: 21,
      y: 9
    };
    map.sketch.draw(begin, end, "wall");
    begin.y = 11;
    end.y = 11;
    map.sketch.draw(begin, end, "wall");
    map.sketch.create_wall(19, 10);
    map.sketch.create_wall(21, 10);
    units.units[0].set_move(20, 10);
    return units.units[0].agility = 25;
  };

  legDisability = function(units, map) {
    units.create(new Human(10, 10, "Can'tWalk", 0));
    units.units[0].body.leg = 2;
    return units.units[0].set_move(20, 20);
  };

  cuttingDown = function(units, map) {
    map.sketch.create("tree", 10, 10);
    units.create(new Human(20, 10, "logger", 1));
    units.create(new Human(25, 10, "gatherer", 0));
    return map.dest.add_stockpile({
      x: 400,
      y: 100,
      build: "tree"
    });
  };

  pigInvasion = function(units, map) {
    units.create(new Lightboar(0, 4, "pigboy", 0));
    units.create(new Lightboar(3, 3, "pigone", 0));
    units.create(new Lightboar(2, 3, "pigtwo", 0));
    units.create(new Lightboar(20, 15, "pigthree", 0));
    units.units[1].order = null;
    units.units[2].order = null;
    units.units[3].order = null;
    return map.sketch.create("crystal", 5, 5);
  };

  fullTestBoars = function(units, map) {
    map.sketch.create_crystal(20, 20);
    map.map[20][20].items = 50;
    units.generate_boars();
    return units.create(new Human(10, 10, "grumpy_killer", 0));
  };

  normalScenario = function(units, map) {
    map.collision.forbid(new Rect(10, 10, 0, 0));
    map.collision.forbid(new Rect(12, 10, 0, 0));
    map.generate.generate();
    units.create(new Human(10, 10, "Killy", 0));
    units.units[0].stance = 1;
    units.create(new Human(12, 10, "Cibo", 1));
    return units.units[1].stance = 1;
  };

  handDisabilityCombat = function(units, map) {
    units.create(new Human(10, 10, "nofight", 0));
    units.create(new Human(10, 20, "Target", 1));
    units.units[0].body.hand = 2;
    return units.units[0].target = units.units[1];
  };

  terrainTest = function(units, map) {
    map.generate.create_building(10, 10, 3);
    map.sketch.create("crystal", 11, 11);
    map.generate.create_building(9, 9, 1);
    map.generate.create_building(13, 14, 3);
    map.sketch.create_crystal(10, 10);
    map.collision.forbid(new Rect(20, 20, 0, 0));
    map.generate.create_building(20, 20, 2);
    map.generate.create_building(-1, 0, 2);
    map.generate.create_building(99, 0, 2);
    map.generate.create_building(23, 23, 1);
    map.generate.create_building(10, 23, 2);
    return map.generate.create_building(14, 23, 5);
  };

  unpathable1 = function(units, map) {
    units.create(new Human(10, 10, "pathfinder_one", 0));
    map.sketch.create_wall(20, 10);
    units.units[0].set_move(20, 10);
    return units.units[0].agility = 25;
  };

  ScenarioTester = (function() {

    function ScenarioTester(parent) {
      this.parent = parent;
      this.status = true;
    }

    ScenarioTester.prototype.input = function(result) {
      if (this.status === true) {
        switch (result) {
          case "undo":
            return this.parent.reset();
        }
      }
    };

    return ScenarioTester;

  })();

  ScenarioInitialize = (function() {

    function ScenarioInitialize(units, map) {
      this.units = units;
      this.map = map;
    }

    ScenarioInitialize.prototype.create = function(name) {
      this.name = name;
      return this.run();
    };

    ScenarioInitialize.prototype.run = function() {
      switch (this.name) {
        case "combat":
          return combat(this.units, this.map);
        case "leg_disability":
          return legDisability(this.units, this.map);
        case "pig_invasion":
          return pigInvasion(this.units, this.map);
        case "hand_disability_combat":
          return handDisabilityCombat(this.units, this.map);
        case "hand_disability_gathering":
          return handDisabilityGathering(this.units, this.map);
        case "full_test_boars":
          return fullTestBoars(this.units, this.map);
        case "pathfinding":
          return pathfinding(this.units, this.map);
        case "unpathable_1":
          return unpathable1(this.units, this.map);
        case "unpathable_2":
          return unpathable2(this.units, this.map);
        case "terrain_test":
          return terrainTest(this.units, this.map);
        case "cuttingDown":
          return cuttingDown(this.units, this.map);
        default:
          return normalScenario(this.units, this.map);
      }
    };

    return ScenarioInitialize;

  })();

  JobsManager = (function() {

    function JobsManager(map, units) {
      this.map = map;
      this.units = units;
      this.setup();
    }

    JobsManager.prototype.setup = function() {
      return this.queue = [];
    };

    JobsManager.prototype.assigns = function() {
      var u, _i, _len, _ref, _results;
      if (this.queue.length === 0) return -1;
      _ref = this.units;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.job === null) {
          u.set_job(this.map.stockpoints[this.queue[0]]);
          u.order = 0;
          this.map.stockpoints[this.queue[0]].persons.push(u);
          this.queue.shift();
          if (this.queue.length === 0) {
            break;
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    JobsManager.prototype.queuing = function() {
      var count, i, length, q, s, _i, _j, _len, _len2, _ref, _ref2, _results;
      count = 0;
      this.queue = [];
      _ref = this.map.stockpoints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        if (s.check_assign() === false && s.finish === false) {
          i = 0;
          length = this.queue.length;
          _ref2 = this.queue;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            q = _ref2[_j];
            if (q.priority < s.priority) {
              this.queue.splice(i, 0, count);
              i += 1;
            }
          }
          if (this.queue.length === length) this.queue.push(count);
        }
        _results.push(count += 1);
      }
      return _results;
    };

    JobsManager.prototype.reset = function() {
      return this.setup();
    };

    return JobsManager;

  })();

  MsgManager = (function() {

    function MsgManager() {
      this.relations = [];
      this.last_status = -1;
    }

    MsgManager.prototype.create_combat_relation = function(unit_one, unit_two) {
      this.relations.push(new CombatRelation([unit_one, unit_two]));
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
      if (n === false) return this.create_combat_relation(unit_one, unit_two);
      return n;
    };

    MsgManager.prototype.combat_msg = function(unit_one, unit_two, msg) {
      var n;
      n = this.find_or_create_combat_relation(unit_one, unit_two);
      this.relations[n].add_msg(msg);
      this.last_status = n;
      return n;
    };

    MsgManager.prototype.get_last_update = function() {
      if (this.last_status === -1) return -1;
      return this.relations[this.last_status].last();
    };

    MsgManager.prototype.combat_death = function(object) {
      var msg;
      if (object === false) return;
      switch (object.action) {
        case "killed":
          msg = object.actors[0] + " " + object.action + " " + object.actors[1];
          break;
        case "escaped":
          msg = object.actors[1] + " " + object.action + " from the grasp of " + object.actors[0];
      }
      return this.combat_msg(object.actors[0], object.actors[1], msg);
    };

    MsgManager.prototype.dodge = function(object) {
      var msg;
      if (object.ability === false) {
        msg = object.actors[0] + " can't dodge!";
      } else {
        msg = object.actors[0] + " dodges " + object.actors[1] + "'s strike";
      }
      return this.combat_msg(object.actors[0], object.actors[1], msg);
    };

    MsgManager.prototype.determine_combat_msg = function(objects) {
      var o, _i, _len, _results;
      if (objects === -1) return;
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        o = objects[_i];
        switch (o.action) {
          case "strike":
            _results.push(this.strike(o));
            break;
          case "dodge":
            _results.push(this.dodge(o));
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    };

    MsgManager.prototype.strike = function(object) {
      var attack_msg, damage_msg, m, msgs, part, _i, _len, _results;
      part = object.part;
      msgs = [];
      attack_msg = object.actors[0] + " strikes!";
      msgs.push(attack_msg);
      damage_msg = object.actors[1] + "'s " + part + " suffers damage!";
      switch (object.type) {
        case 0:
          msgs.push(damage_msg);
          break;
        case 1:
          msgs.push(damage_msg);
          msgs.push(object.actors[1] + " dies of " + object.cause);
          break;
        case 2:
          msgs.push(damage_msg);
          break;
        case 3:
          msgs.push(object.actors[1] + "'s " + part + " was protected by his " + object.protect);
      }
      switch (object.special) {
        case 0:
          msgs.push(object.actors[1] + " losts some hand functionality");
          break;
        case 1:
          msgs.push(object.actors[1] + " suffers hand disability");
          break;
        case 2:
          msgs.push(object.actors[1] + " losts some leg functionality");
          break;
        case 3:
          msgs.push(object.actors[1] + " losts all leg functionality");
      }
      _results = [];
      for (_i = 0, _len = msgs.length; _i < _len; _i++) {
        m = msgs[_i];
        _results.push(this.combat_msg(object.actors[0], object.actors[1], m));
      }
      return _results;
    };

    return MsgManager;

  })();

  Units = (function() {

    function Units(map, msgs) {
      this.map = map;
      this.msgs = msgs;
      this.setup();
    }

    Units.prototype.setup = function() {
      this.units = [];
      this.fatalities = 0;
      this.advance = true;
      this.frame = 0;
      return this.finder = new Pathfinder(this.map);
    };

    Units.prototype.create = function(unit) {
      return this.units.push(unit);
    };

    Units.prototype.move = function() {
      var unit, _i, _j, _len, _len2, _ref, _ref2;
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        unit = _ref[_i];
        if (this.frame % unit.agility === 0) {
          unit.set_action(this.map, this);
          unit.combat.detect(this);
          this.msgs.determine_combat_msg(unit.combat.attack());
          unit.move(this.finder);
        }
      }
      if (this.frame % 1000 === 0) {
        if (this.map.items_total() > 50 && random_number(5) === 0) {
          this.generate_boars();
        }
      }
      _ref2 = this.units;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        unit = _ref2[_j];
        this.msgs.combat_death(unit.combat.nullify_target());
      }
      return this.frame += 1;
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
      this.units = (function() {
        var _j, _len2, _ref2, _results;
        _ref2 = this.units;
        _results = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          unit = _ref2[_j];
          if (unit.body.check_death() === false) _results.push(unit);
        }
        return _results;
      }).call(this);
      return this.units = (function() {
        var _j, _len2, _ref2, _results;
        _ref2 = this.units;
        _results = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          unit = _ref2[_j];
          if (unit.leave === false) _results.push(unit);
        }
        return _results;
      }).call(this);
    };

    Units.prototype.kills = function() {
      var k, u, _i, _len, _ref;
      k = 0;
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.hostility === 0) k += u.kills.length;
      }
      return k;
    };

    Units.prototype.hostile_filter = function(hostile) {
      var u, _i, _len, _ref, _results;
      _ref = this.units;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.hostility === hostile) _results.push(u);
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
        if (u.hostility === 0) if (u.name === name) return u.kills;
      }
    };

    Units.prototype.tells = function(msg, type) {
      var u, units, _i, _len, _results;
      units = this.hostile_filter(type);
      _results = [];
      for (_i = 0, _len = units.length; _i < _len; _i++) {
        u = units[_i];
        _results.push(u.receive_msg(msg));
      }
      return _results;
    };

    Units.prototype.generate_boars = function() {
      var existing_boars, name, size, u, _i, _len, _ref, _results;
      existing_boars = 0;
      _ref = this.units;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        u = _ref[_i];
        if (u.type === 2) existing_boars += 1;
      }
      if (existing_boars === 0) {
        size = random_number(3);
        _results = [];
        while (existing_boars !== size + 1) {
          existing_boars += 1;
          name = random_number(100);
          _results.push(this.units.push(new Lightboar(0, random_number(100), "lightboar" + name)));
        }
        return _results;
      }
    };

    Units.prototype.reset = function() {
      return this.setup();
    };

    return Units;

  })();

}).call(this);
