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

        # default values

        _defaultCatalog = {}
        figi.catalog = _defaultCatalog

        _defaultClasses = "emote"
        figi.classes = _defaultClasses

        _defaultPath = "./"
        figi.path = _defaultPath

        _defaultReplacer = ( value, key ) ->
            "<img src=\"#{ @path }#{ value }\" alt=\"#{ key }\" class=\"#{ @classes.join?( " " ) or @classes }\" />"
        figi.replacer = _defaultReplacer

        figi

) ->
    if typeof define is "function" and define.amd
        define [], factory
    else if typeof exports is "object"
        module.exports = factory()
    else
        root.figi = factory()
    return
