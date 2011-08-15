fs = require 'fs'
{exec} = require 'child_process'
util = require 'util'

views = 'app/views/coffee'

views_js = 'app/views/js'

target_file_name = "game"
target_coffee_file = "#{views}/#{target_file_name}.coffee"
target_js_file = "#{views_target}/#{target_file_name}.js"

coffee_opts = "--bare --output #{views_js} --compile #{target_coffee_file}"


js_files = [
  'menu'
]

task 'build', 'Build a single JavaScript file from prod files', ->
  util.log "Building #{target_js_file}"
  appContents = new Array remaining = js_files.length
  util.log "Appending #{js_files.length} files to #{prodTargetCoffeeFile}"
  for file, index in js_files then do (file, index) ->
    fs.readFile "#{views}/#{file}.coffee"
                , 'utf8'
                , (err, fileContents) ->
        util.log err if err

        appContents[index] = fileContents
        util.log "[#{index + 1}] #{file}.coffee"
        process() if --remaining is 0

        process = ->
        fs.writeFile prodTargetCoffeeFile
        , appContents.join('\n\n')
        , 'utf8'
        , (err) ->
        util.log err if err

        exec "coffee #{coffee_opts}", (err, stdout, stderr) ->
          util.log err if err
          message = "Compiled #{target_js_file}"
          util.log message
          fs.unlink prodTargetCoffeeFile, (err) -> util.log err if err