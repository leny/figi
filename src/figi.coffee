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

        figi = ( string, options = {} ) ->
            options.catalog ?= figi.catalog ? _defaultCatalog
            options.classes ?= figi.classes ? _defaultClasses
            options.path ?= figi.path ? _defaultPath
            options.replacer ?= figi.replacer ? _defaultReplacer

            for key, value of options.catalog when typeof key is "string"
                string = string.replace key, -> options.replacer.call options, value, key

            string

        _defaultCatalog = {}
        figi.catalog = _defaultCatalog

        _defaultClasses = "emote"
        figi.classes = _defaultClasses

        _defaultPath = "./"
        figi.path = _defaultPath

        _defaultReplacer = ( value, key ) ->
            "<img src=\"#{ @path ? _defaultPath }#{ value }\" alt=\"#{ key }\" class=\"#{ @classes.join?( " " ) or @classes }\" />"
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
