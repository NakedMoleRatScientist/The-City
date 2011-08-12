fs = require 'fs'
{exec} = require 'child_process'
util = require 'util'

views = 'app/views/coffee'
models = 'app/models/coffee'
controllers = 'app/controllers/coffee'

views_target = 'app/views/js'
models_target = 'app/models/js'
controllers_target = 'app/controllers/js'

task 'build', 'Build a single javascript file from prod files', ->
  util.log "Building..."