fs = require 'fs'
{exec} = require 'child_process'
util = require 'util'

develop = 'app/*'
test = 'test_coffee/*'

develop_target = 'public/js/*'
test_target = 'test/*'

task 'build', 'Build a single javascript file from prod files', ->
  util.log "Building..."