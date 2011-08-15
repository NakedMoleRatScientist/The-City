fs = require 'fs'
{exec} = require 'child_process'
util = require 'util'

views = 'app/views/coffee'

views_js = 'app/views/js'

target_file_name = "game"
target_coffee_file = "#{views}/#{target_file_name}.coffee"
target_js_file = "#{views_target}/#{target_file_name}.js"

coffee_opts = "--bare --output #{views_js} --compile #{target_coffee_file}"

task 'build', 'Build a single javascript file from prod files', ->
  util.log "Building..."