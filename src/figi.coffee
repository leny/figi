###
 * figi
 * https://github.com/Leny/figi
 *
 * Copyright (c) 2014 Leny
 * Licensed under the MIT license.
###

do (
    root = this,
    factory = ->

        figi = ->

            # TODO

        figi

) ->
    if typeof define is "function" and define.amd
        define [], factory
    else if typeof exports is "object"
        module.exports = factory()
    else
        root.figi = factory()
    return
