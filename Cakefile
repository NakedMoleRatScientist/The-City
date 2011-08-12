fs = require 'fs'
{exec} = require 'child_process'
util   = require 'util'

prodSrcCoffeeDir     = 'production/src/coffee-script'
testSrcCoffeeDir     = 'test/src/coffee-script'

prodTargetJsDir      = 'production/src/js'
testTargetJsDir      = 'test/src/js'

prodTargetFileName   = 'app'
prodTargetCoffeeFile = "#{prodSrcCoffeeDir}/#{prodTargetFileName}.coffee"
prodTargetJsFile     = "#{prodTargetJsDir}/#{prodTargetFileName}.js"

prodCoffeeOpts = "--bare --output #{prodTargetJsDir} --compile #{prodTargetCoffeeFile}"
testCoffeeOpts = "--output #{testTargetJsDir}"

prodCoffeeFiles = [
    'intro'
    'core'
    'outro'
]
