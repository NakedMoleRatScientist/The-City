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
  util.log "Building #{prodTargetJsFile}"
  appContents = new Array remaining = prodCoffeeFiles.length
  util.log "Appending #{prodCoffeeFiles.length} files to #{prodTargetCoffeeFile}"
  for file, index in prodCoffeeFiles then do (file, index) ->
    fs.readFile "#{prodSrcCoffeeDir}/#{file}.coffee"
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

        exec "coffee #{prodCoffeeOpts}", (err, stdout, stderr) ->
          util.log err if err
          message = "Compiled #{prodTargetJsFile}"
          util.log message
          fs.unlink prodTargetCoffeeFile, (err) -> util.log err if err