fs = require 'fs'
{exec} = require 'child_process'
util = require 'util'

views = 'app/views'
models = 'app/models'
controllers = 'app/controllers'

task 'build', 'Build a single javascript file from prod files', ->
  util.log "Building..."