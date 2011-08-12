fs = require 'fs'
{exec} = require 'child_process'
util = require 'util'

views = 'app/views/coffee'
models = 'app/models/coffee'
controllers = 'app/controllers/coffee'

views_target = 'app/views/js'
models_target = 'app/models/js'
controllers_target = 'app/controllers/js'

target_file = "game"

target_views_coffee = "#{views}/#{views_filename.coffee}"
target_models_coffee = "#{models}/#{models_filename.coffee}"
target_controllers_coffee = "#{controllers}/#{controllers_filename.coffee}"

target_views_js = "#{views}/#{views_filename.js}"
target_models_js = "#{models}/#{models_filename.js}"
target_controllers_js = "#{controllers}/#{controllers_filename.js}"

coffee_opts = "--bare --output #{target_views_js} --compile #{target_views_coffee}"

task 'build', 'Build a single javascript file from prod files', ->
  util.log "Building..."